#!/usr/bin/env zx

// Lambda function 1
// On page load, get and return list of scripts in my repo
// Update the dom with that list
// within()


// Lambda function 2
// Call a script
let lambda_function = async (script, args) => {

  // First -- figure out which script to download ?

  // If you don't see the script in the current file system, download it from github

  let r = await $`{inp} {args}`;
  return `${r}`;
};

