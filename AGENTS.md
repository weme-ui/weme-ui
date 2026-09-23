# AGENTS.md

## Task Completion Requirements

- All of `bun lint`, `bun lint:fix` and `bun typecheck` must pass before considering tasks completed.
- NEVER run `bun test`. Always use `bun run test` (runs Vitest).

## Project

This repository is a VERY EARLY WIP. Proposing sweeping changes that improve long-term maintainability is encouraged.

## Core Priorities

1. Performance first.
2. Reliability first.
3. Keep behavior predictable under load and during failures.

If a tradeoff is required, choose correctness and robustness over short-term convenience.

## Maintainability

Long term maintainability is a core priority. If you add new functionality, first check if there is shared logic that can be extracted to a separate module. Duplicate logic across multiple files is a code smell and should be avoided. Don't be afraid to change existing code. Don't take shortcuts by just adding local logic to solve a problem.

## Honesty Rules

- Before claiming a function, class, type, import, file, command, API, or test result exists, verify it first.
- If you have not verified something, say "I have not verified this". Do not write code that depends on an unverified claim.
- Do not claim tests, builds, lint, or type checks passed unless you actually ran the command in this session and saw the result.
- Never invent error messages, stack traces, API responses, package names, or file paths. If you did not see it, say so.
- When you genuinely do not know, say "I do not know yet" and check first.

## Verification Protocol

Before writing or editing code that uses a symbol, do at least one:

1. Read the file where the symbol is defined and confirm its signature.
2. Search the repo for the exact symbol name.
3. Check the dependency manifest before using a package.
4. If the claim depends on runtime behavior, run the relevant command.

If verification is skipped, label the claim as unverified instead of presenting it as fact.

## Generate Text

When answering questions or generate commit message, keep the content in Chinese, and related technical terms such as Vue, React, Effect, TypeScript, etc. do not remain unchanged in English.
