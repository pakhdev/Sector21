export async function interact(options) {
    const { action, ...rest } = options;
    await fetch('http://localhost:1337/interaction/' + action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rest)
    });
    return 'ok';
}
