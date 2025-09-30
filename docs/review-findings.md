# Review Findings

## Typo Fix Task
- **Issue:** The `addemo` command description says "Thêm emmo vào server." which contains the misspelling "emmo" instead of "emoji".
- **Proposed Fix:** Update the description string in `Commands/info/addemo.js` to use the correct spelling.

## Bug Fix Task
- **Issue:** The message edit snipe cache truncation uses `esnipes == esnipes.slice(0, 4)` instead of assigning, so the cache never shrinks and can grow indefinitely.
- **Proposed Fix:** Replace the equality check with an assignment (e.g., `esnipes = esnipes.slice(0, 4)`) before storing the array back on the collection.

## Documentation Alignment Task
- **Issue:** The README instructs users to change `GUILD_ID` everywhere, but the codebase hard-codes multiple other IDs (e.g., welcome channel ID and invite log channel ID) that also need adjustment, so newcomers may miss them.
- **Proposed Fix:** Expand the README setup section to list every hard-coded ID (welcome channel, invite log channel, slash command guild ID, etc.) that should be customized before running the bot.

## Test Improvement Task
- **Issue:** There are no automated tests covering `handlers/command.js`, so the dynamic command loader (including alias registration and error paths) can break without detection.
- **Proposed Fix:** Add a unit test that stubs the filesystem to ensure commands and aliases are registered correctly and that files missing a `name` are skipped as intended.
