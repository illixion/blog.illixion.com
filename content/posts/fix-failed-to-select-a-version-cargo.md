---
author: Manual
title: How to fix "failed to select a version for the requirement" in Rust's Cargo
date: "2021-10-21"
summary: Local registry cache corruption can cause issues where Cargo won't be able to find new versions of packages. Here's the solution.
tags: 
- cargo
- rust
categories:
- tipsandtricks
---

Have you just encountered this error message while compiling a Rust project?

```log
❯ cargo --version
cargo 1.55.0
❯ rustc --version
rustc 1.55.0
❯ cargo build
    Updating crates.io index
error: failed to select a version for the requirement `anyhow = "=1.0.44"`
candidate versions found which didn't match: 1.0.42, 1.0.41, 1.0.40, ...
location searched: crates.io index
required by package `fuzzysearch-cli v0.2.0 (/*snip*/rust-project)`
❯ cargo update
    Updating crates.io index
error: failed to select a version for the requirement `clap = "^3.0.0-beta.5"`
candidate versions found which didn't match: 2.33.3, 2.33.2, 2.33.1, ...
location searched: crates.io index
required by package `fuzzysearch-cli v0.2.0 (/*snip*/rust-project)`
```

## Solution

Apparently, Cargo can sometimes get into a state where its local registry cache will corrupt itself, and Cargo won't be able to discover new versions of the dependencies. To resolve this, delete the `~/.cargo/registry` folder and run the build command again.

Hope this helps!
