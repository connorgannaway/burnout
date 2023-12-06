#!/bin/sh

# Check if the current directory is a git repository
if [ ! -d .git ] && ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "This is not a git repository"
    exit 1
fi

# Get the current branch name
current_branch=$(git branch --show-current)

# Print the current branch name
if [ -z "$current_branch" ]; then
    echo "No current branch (You might be in 'detached HEAD' state)"
else
    echo "Current branch: $current_branch"
    # Add a warning if the branch name does not contain 'release'
    if [[ ! $current_branch =~ release ]]; then
        echo "WARNING: Not on a Release Branch."
    fi
fi
djangopath='./backend/pitwallapi/__init__.py'
packagepath='./frontend/burnout/package.json'
apppath='./frontend/burnout/app.json'

# Get current versions
django=$(grep "__version__ =" $djangopath | awk -F\' '{print $2}')
package=$(grep "version" $packagepath | awk -F\" '{print $4}')
app=$(grep "version" $apppath | awk -F\" '{print $4}')

# Print versions
echo
echo "Current Versions:"
echo "__init__.py: $django"
echo "package.json: $package"
echo "app.json: $app"
echo
echo -n "Bump all to: "
read bump

# Check for semantic versioning (x.x.x)
if [[ ! $bump =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Invalid version number format. Please use the format: X.X.X"
    echo "Confirm this is what you want. Continuing."
fi

# Update files
echo "Bumping"
sed -i "/__version__ =/s/'$django'/'$bump'/" "$djangopath"
sed -i "/\"version\":/s/\"$package\"/\"$bump\"/" "$packagepath"
sed -i "/\"version\":/s/\"$app\"/\"$bump\"/" "$apppath"
echo "Done."
