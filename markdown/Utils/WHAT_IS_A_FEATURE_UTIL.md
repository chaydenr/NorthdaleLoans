# What should go in <code>pages/*\<pageName\>*/features/*\<featureName\>*/shared/utils</code>?

## Criteria
A `feature` `util` is any function that only needs be used in a single `feature`. This util should live in 
<code>src/pages/*\<pageName\>*/features/*\<featureName\>*/shared/utils</code>


## This doesn't fix my criteria
If a `util` needs to be used across multiple `pages`, [See Shared Utils](./WHAT_IS_A_SHARED_UTIL.md)

If a `util` only needs to be used in a single `page` and across multiple features, [See Feature Utils](./WHAT_IS_A_FEATURE_UTIL.md)


## Folder setup
```markdown
utils  
└───myFn
│   │
│   └───types
│       │   myFn.types.ts
│   myFn.ts
```
 
 The function should go into the *functionName.ts* file.

 If any types/interfaces are needed they should go into the *types* folder and be called *functionName.types.ts*.

  You **must** import/export the function in the `index.ts` that is located in the 
  <code>src/pages/*\<pageName\>*/features/*\<featureName\>*</code>.