const mermaidBlocks = document.querySelectorAll('pre > code.language-mermaid');

if (mermaidBlocks.length > 0) {
    import('https://cdn.jsdelivr.net/npm/mermaid@12/dist/mermaid.esm.min.mjs')
        .then(({ default: mermaid }) => {
            mermaid.initialize({ startOnLoad: false });
            mermaidBlocks.forEach((codeBlock) => {
                const container = document.createElement('div');
                container.className = 'mermaid';
                container.textContent = codeBlock.textContent;
                codeBlock.parentElement.replaceWith(container);
            });
            return mermaid.run();
        })
        .catch((error) => console.error('Unable to render Mermaid diagrams.', error));
}
