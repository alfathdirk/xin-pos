function tokenize (t) {
  let tokens = [];
  t.split('{').forEach(pre => {
    let [ v, s ] = pre.split('}');
    if (s === undefined) {
      tokens.push(['s', v]);
      return;
    }

    tokens.push(['v', v]);

    if (s) {
      tokens.push(['s', s]);
    }
  });
  return tokens;
}

function format (tokens, row) {
  return tokens.map(([ t, v ]) => t === 's' ? v : (row[v] || '')).join('');
}

export default function () {
  return (row, t) => '#!' + format(tokenize(t), row);
}
