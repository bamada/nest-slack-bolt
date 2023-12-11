

# [1.1.0](https://github.com/bamada/nest-slack-bolt/compare/1.0.0...1.1.0) (2023-12-11)


### Bug Fixes

* **npm:** update lock file ([7825d8c](https://github.com/bamada/nest-slack-bolt/commit/7825d8ca19afdae6e36e470ac2cfee797c5acf36))


### Features

* **logging:** control bolt log levels ([c650c04](https://github.com/bamada/nest-slack-bolt/commit/c650c04449be2bd4a64ff9774f5df0c32f183fe6))

# [1.0.0](https://github.com/bamada/nest-slack-bolt/compare/0.2.0...1.0.0) (2023-12-10)


### Bug Fixes

* **deps:** update commitlint monorepo to v17.8.0 ([1754edc](https://github.com/bamada/nest-slack-bolt/commit/1754edccfd51aa53c0a26e172baeaf64bc34bdb3))
* **deps:** update commitlint monorepo to v17.8.1 ([a429232](https://github.com/bamada/nest-slack-bolt/commit/a429232d7650e952cc585a3ae1838ab050d129bd))
* **deps:** update commitlint monorepo to v18 ([f13709d](https://github.com/bamada/nest-slack-bolt/commit/f13709d9e4d1c0bc756e08e5567da0a27a8d250f))
* **deps:** update commitlint monorepo to v18.4.2 ([37807da](https://github.com/bamada/nest-slack-bolt/commit/37807dac6f1c6c3cade1930be7166d699f81ced4))
* **deps:** update commitlint monorepo to v18.4.3 ([73be576](https://github.com/bamada/nest-slack-bolt/commit/73be5768c619e53e790fb0c7b8dead5996cff35d))
* **deps:** update dependency @commitlint/cli to v17.7.2 ([6b5b5ed](https://github.com/bamada/nest-slack-bolt/commit/6b5b5ed81cc886193c92be73762985905b229070))
* **deps:** update dependency @nestjs/config to v3.1.0 ([54f4ac8](https://github.com/bamada/nest-slack-bolt/commit/54f4ac81c7c0a604d42ebcbe5628351fa75d22a7))
* **deps:** update dependency @nestjs/config to v3.1.1 ([522011d](https://github.com/bamada/nest-slack-bolt/commit/522011d2e60bcbd62553b5171d10ab22828067a6))
* **deps:** update dependency @slack/bolt to v3.14.0 ([3a8347b](https://github.com/bamada/nest-slack-bolt/commit/3a8347b28fd5a1a0138c550b1bad93df7420b03c))
* **deps:** update dependency @slack/bolt to v3.15.0 ([48fd504](https://github.com/bamada/nest-slack-bolt/commit/48fd50400d6a58b337bdfa74769c7cc4dc890cd8))
* **deps:** update dependency @slack/bolt to v3.16.0 ([4198236](https://github.com/bamada/nest-slack-bolt/commit/4198236bfa41b85a6fb9c90d54bbd76edc6e61e0))
* **deps:** update nest monorepo ([4b1fd08](https://github.com/bamada/nest-slack-bolt/commit/4b1fd08cfe5f96d01c74beab6226a8593f3eba11))
* **deps:** update nest monorepo to v10.2.10 ([d3549e6](https://github.com/bamada/nest-slack-bolt/commit/d3549e6907e2a567181519bc451b899b98b767ff))
* **deps:** update nest monorepo to v10.2.5 ([439f40a](https://github.com/bamada/nest-slack-bolt/commit/439f40ab17f628d97efb786e1ee2a35e0d677415))
* **deps:** update nest monorepo to v10.2.6 ([eb591f7](https://github.com/bamada/nest-slack-bolt/commit/eb591f7b897017f58a19871196dfe6a0fa38752d))
* **deps:** update nest monorepo to v10.2.7 ([a57be6f](https://github.com/bamada/nest-slack-bolt/commit/a57be6fd1dd6514cbd9ba42c8fc13068f6b78834))
* **doc:** add contributors libs ([a6c3d4d](https://github.com/bamada/nest-slack-bolt/commit/a6c3d4d4bfcd949f6ff2cb33fa9d1fbf670087af))
* **logger:** fix logger proxy issue ([9b7e830](https://github.com/bamada/nest-slack-bolt/commit/9b7e83076c66d4d46b32e9fbd5e82df02a9c6c08))


### Features

* **179:** Update SlackModule to support user-provided configuration ([0784ff0](https://github.com/bamada/nest-slack-bolt/commit/0784ff0a5d4b84d7bdad2f18e95c0ec51f50869c))
* add slack view submission support ([0fbd02f](https://github.com/bamada/nest-slack-bolt/commit/0fbd02fa5dc564150afa256ebf80b73ec51f2192))


### Reverts

* remove .vscode folder ([b347dcf](https://github.com/bamada/nest-slack-bolt/commit/b347dcfac4d49a7c3163af63c7c6c6ef6633b08a))
* remove [@nadir2k](https://github.com/nadir2k) from author ([6449f3a](https://github.com/bamada/nest-slack-bolt/commit/6449f3a099203d0eeb540340dd3ef508175ef033))
* remove yarn.lock ([8c6f240](https://github.com/bamada/nest-slack-bolt/commit/8c6f240900a2180b0b04be77026c230fbf25408e))


### BREAKING CHANGES

* **179:** The SlackModule now requires using the forRoot() method for configuration. Users must update their code to use the forRoot() method when importing the SlackModule.

# [0.2.0](https://github.com/bamada/nest-slack-bolt/compare/0.1.0...0.2.0) (2023-08-18)


### Bug Fixes

* **deps:** update commitlint monorepo ([f2e31a4](https://github.com/bamada/nest-slack-bolt/commit/f2e31a4e45f4f2cd79b55109ef42d39d9fd72f5d))
* **deps:** update commitlint monorepo to v17.4.4 ([5b2bb98](https://github.com/bamada/nest-slack-bolt/commit/5b2bb9893996775fd50fa08846231822ce6a5b38))
* **deps:** update commitlint monorepo to v17.6.3 ([5ff999b](https://github.com/bamada/nest-slack-bolt/commit/5ff999b8a1458b13469d66c8f2cf2fca2623c32c))
* **deps:** update dependency @commitlint/cli to v17.5.0 ([57b8c4e](https://github.com/bamada/nest-slack-bolt/commit/57b8c4ec674c0498e47d5bf07ab1a41945b832f7))
* **deps:** update dependency @commitlint/cli to v17.5.1 ([04946dd](https://github.com/bamada/nest-slack-bolt/commit/04946dde18661552dbb38495876df89b0de209e5))
* **deps:** update dependency @nestjs/config to v2.3.4 ([33a3c0b](https://github.com/bamada/nest-slack-bolt/commit/33a3c0b46756be6253993796a4627bae90ddcd59))
* **deps:** update dependency @slack/bolt to v3.13.1 ([5d69541](https://github.com/bamada/nest-slack-bolt/commit/5d69541714cd2a93c88fac85fac7c1ed71544d92))
* **deps:** update dependency @slack/bolt to v3.13.3 ([c00482a](https://github.com/bamada/nest-slack-bolt/commit/c00482aea2d69d980ff4730329e550613bccbb7f))
* **deps:** update nest monorepo ([647ad4f](https://github.com/bamada/nest-slack-bolt/commit/647ad4fde9f688935697c870940518284bd48355))
* **deps:** update nest monorepo to v9.3.12 ([1f64a8d](https://github.com/bamada/nest-slack-bolt/commit/1f64a8d494892ab00e3f64e34dc56ce4b3068b9c))
* **deps:** update nest monorepo to v9.4.0 ([8211575](https://github.com/bamada/nest-slack-bolt/commit/8211575828720797958ea83ddde20ce2754a19d8))
* **readme:** Fix readme link ([05e64ae](https://github.com/bamada/nest-slack-bolt/commit/05e64aed8cabceab54eb59528fb4eae0786b6867))


### Features

* **dep:** upgrade to nestjs10 ([8092af6](https://github.com/bamada/nest-slack-bolt/commit/8092af68fbd2db6ee849b0c6e866833ebdbf37c1))

# [0.1.0](https://github.com/bamada/nest-slack-bolt/compare/0.0.7...0.1.0) (2023-02-17)


### Bug Fixes

* **deps:** update commitlint monorepo ([941daa2](https://github.com/bamada/nest-slack-bolt/commit/941daa218f68f677c759a16f9d6745f01ba0aa29))
* **deps:** update commitlint monorepo to v17.2.0 ([2d11302](https://github.com/bamada/nest-slack-bolt/commit/2d11302eb7b0f75b244033e56e0532288a922581))
* **deps:** update commitlint monorepo to v17.3.0 ([c8e2811](https://github.com/bamada/nest-slack-bolt/commit/c8e28119511ccf4ba1af2785620a113483c38ae0))
* **deps:** update commitlint monorepo to v17.4.2 ([c125be9](https://github.com/bamada/nest-slack-bolt/commit/c125be9fa7e69525354a36a6412509c89861f7ae))
* **deps:** update commitlint monorepo to v17.4.3 ([5a6b76b](https://github.com/bamada/nest-slack-bolt/commit/5a6b76b24ef74ee42b16d31c817ba0d52b3107b7))
* **deps:** update dependency @nestjs/config to v2.3.0 ([682040c](https://github.com/bamada/nest-slack-bolt/commit/682040c65cdb499a68fcc4ccd333ec7ae188a5e3))
* **deps:** update dependency @nestjs/config to v2.3.1 ([8812e4d](https://github.com/bamada/nest-slack-bolt/commit/8812e4d4235d28da91bc2760b313c88bc49f96f0))
* **deps:** update dependency @slack/bolt to v3.12.2 ([671bb19](https://github.com/bamada/nest-slack-bolt/commit/671bb19e836fc262940820a2a716bdb18084c2d3))
* **deps:** update dependency husky to v8.0.2 ([a814d50](https://github.com/bamada/nest-slack-bolt/commit/a814d50e8be2cb06171556168442abba7d96f0cf))
* **deps:** update dependency husky to v8.0.3 ([407e609](https://github.com/bamada/nest-slack-bolt/commit/407e609a4e91f8da4b248062849af9624af8134c))


### Features

* **dep:** Update dependencies ([24ae9e6](https://github.com/bamada/nest-slack-bolt/commit/24ae9e67c2f97107a2c522155de46d1b80ae0c61))
* **imp:** make public access to slack client ([c6fdf21](https://github.com/bamada/nest-slack-bolt/commit/c6fdf21d7c93157b8bc5d7545fc184423123a5f2))
* **imp:** Simplify webClient usage ([a3c24f7](https://github.com/bamada/nest-slack-bolt/commit/a3c24f7ee1bb62a28ba26e699cc9427c242847e4))
* **imp:** Update readme ([63ede85](https://github.com/bamada/nest-slack-bolt/commit/63ede85c3f4efa8e1702194c556b552c0ddbf391))
* **otab:**  handle shortcut events ([b2ab16d](https://github.com/bamada/nest-slack-bolt/commit/b2ab16d78b112780e7df45c0f0553fe6c973da14))

## [0.0.7](https://github.com/bamada/nest-slack-bolt/compare/0.0.6...0.0.7) (2022-10-29)

## [0.0.6](https://github.com/bamada/nest-slack-bolt/compare/0.0.5...0.0.6) (2022-10-29)
