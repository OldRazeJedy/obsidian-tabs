# Obsidian Tabs

Create and render interactive tabs in your Obsidian notes using a `tabs` code block.

## Usage

### Basic Tabs

````markdown
```tabs
tab: Tab One
Content of Tab One

tab: Tab Two
Content of Tab Two
```
````

### Nested Code Blocks & Inner Tabs

Wrap the outer block with additional backticks or `~~~` when embedding code blocks or nested tabs:

`````markdown
````tabs
tab: Python
```python
print("Hello Tabs")
```

tab: Nested
```tabs
tab: Inner 1
Inner tab content
```
````
`````

### Configuration

Place comma-separated options before the first `tab:` line:

````markdown
```tabs
top, multi
tab: Tab 1
Content 1
tab: Tab 2
Content 2
```
````

| Option | Description |
| :---: | :--- |
| `top` / `bottom` / `left` / `right` | Tab navigation bar position |
| `one` / `multi` | Single-line scrollable or multi-line wrapped tab titles |
| `action-add` / `action-edit` / `action-none` | Action button behavior in the tab bar |

## Development

```bash
npm install
npm run build
```

## License

MIT. Based on [Obsidian Tabs](https://github.com/xhuajin/obsidian-tabs) by Huajin.
