# What should go in `shared/utils`?
A shared `util` is any function that can be reused within multiple `pages`.

If a `util` only needs to be used in a single `page` and across multiple features, [See Here](../../pages/CopyExample/shared/utils/WHAT_IS_A_PAGE_UTIL.md)

If a `util` only needs to be used in a single `feature`, [See Here](../../pages/CopyExample/features/FeatureExample/shared/utils/WHAT_IS_A_FEATURE_UTIL.md)

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

 You **must** import/export in the `index.ts` that is located in the `shared/utils`. This is so you can use the `@shared/utils` import.