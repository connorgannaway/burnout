#!/bin/sh
if [ -f "./errors.txt" ]; then
    echo -n "Would you like me to delete errors.txt (y|n)? "
    read yn
    if [ "$yn" == "y" ]; then
        rm errors.txt
    else
        exit
    fi
fi
echo -n "Would you like to run the linter with the --fix option (y|n)? "
read yn
fix=""
if [ "$yn" == "y" ]; then
    fix="--fix"
fi
declare -a dirs=("components" "screens" ".")
for DIR in ${dirs[@]}; do
    for FILE in `ls $DIR`; do
        echo "linting $DIR/$FILE currently"
        if [ `echo "$DIR/$FILE" | grep -E '*.js$'` ]; then
            if [ ! "$DIR/$FILE" == "./babel.config.js" ]; then
                `npx eslint $fix "$DIR/$FILE" >> errors.txt 2>&1`
                printf "\n\n" >> errors.txt
            fi
        fi
    done
done
echo "Check errors.txt for the list of errors"