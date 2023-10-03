#!/bin/sh
declare -a dirs=("components" "screens" ".")
for DIR in ${dirs[@]}; do
    for FILE in `ls $DIR`; do
        if [ `echo "$DIR/$FILE" | grep -E '*.js$'` ]; then
            if [ ! "$DIR/$FILE" == "./babel.config.js" ]; then
                `npx eslint "$DIR/$FILE" >> errors.txt 2>&1`
            fi
        fi
    done
done
