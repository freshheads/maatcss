#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="develop"

TARGET_BRANCH="master"
TARGET_REPO="https://github.com/freshheads/maatcss-docs.git"
TARGET_SSH_REPO="git@github.com:freshheads/maatcss-docs.git"

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping docs deployment; just doing a build."
    exit 0
fi

# Save some useful information
SHA=`git rev-parse --verify HEAD`

# Clone the existing master for maatcss-docs repo into out/
# Create a new empty branch if master doesn't exist yet (should only happen on first deply)
git clone $TARGET_REPO out
cd out
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
cd ..

# Clean out existing contents
rm -rf out/**/* || exit 0

# Copy documentation
cp -R docs/* out/

# Now let's go have some fun with the cloned repo
cd out
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add -A .

# If there are no changes to the compiled out (e.g. this is a README update) then just bail.
if git diff HEAD --quiet; then
    echo "No changes to the output on this push; exiting."
    exit 0
fi

git commit -m "Deploy documentation to GitHub Pages: ${SHA}"

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in ../maatcss_deploy.enc -out ../maatcss_deploy -d
chmod 600 ../maatcss_deploy
eval `ssh-agent -s`
ssh-add ../maatcss_deploy

# Now that we're all set up, we can push.
git push $TARGET_SSH_REPO $TARGET_BRANCH
