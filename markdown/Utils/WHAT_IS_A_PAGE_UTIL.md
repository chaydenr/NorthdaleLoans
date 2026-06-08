# What is a `Page util`?

## Criteria
A shared `Page` `Util` is any function that can be reused across multiple `Features` that live within the same `Page`.

## This doesn't fix my criteria
If a `Util` needs to be used across multiple `Pages`, [See Shared Utils](./WHAT_IS_A_SHARED_UTIL.md)

If a `Util` only needs to be used in a single `Feature`, [See Feature Utils](../../features/FeatureExample/shared/utils/WHAT_IS_A_FEATURE_UTIL.md)

## Folder setup
```markdown
utils  
└───myFn
│   │
│   └───types
│       │   myFn.types.ts
│   myFn.ts
```
 
 The function should go into the *\<functionName\>.ts* file.

 If any types/interfaces are needed they should go into the *types* folder and be called *\<functionName\>.types.ts*.

  You **must** import/export in the `index.ts` that is located in the   
  <code>src/pages/*\<pageName\>*</code>.
  This is so you can use the <code>@pages/*\<pageName\>*</code> import to import this file.