# mcp-bible

Bible MCP — wraps the Bible API (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `get_verse` | Get a specific Bible verse or range by reference (e.g., "john 3:16", "romans 8:28", "psalm 23:1-6"). Returns verse text in World English Bible translation. |
| `get_passage` | Get a Bible passage in your choice of translation (KJV, WEB, OEB, BBE, Cherokee, DRA, and more). Returns full text with reference and translation metadata. |
| `random_verse` | Fetch a random Bible verse from the World English Bible (WEB) translation. Returns the reference, full verse text, translation ID, and per-verse breakdown with book, chapter, and verse number. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "bible": {
      "url": "https://gateway.pipeworx.io/bible/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Bible data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
