const url = "https://api.github.com/repos/tuanka1904/tuanka1904.github.io/actions/runs";
fetch(url, { headers: { "User-Agent": "NodeJS" } })
    .then(r => r.json())
    .then(d => {
        d.workflow_runs.slice(0, 5).forEach(r => {
            console.log(`Run ${r.id} - ${r.status} - ${r.conclusion} - ${r.updated_at} - ${r.name}`);
        });
    });
