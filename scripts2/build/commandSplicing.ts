export function commandSplicing(...restCommends: string[][][]): string[][] {
  const newCommends: string[][] = [];
  if (restCommends.length <= 0) {
    return newCommends;
  }
  if (restCommends.length == 1) {
    return restCommends[0];
  }
  const commends1 = restCommends[0];
  const commends2 = restCommends[1];

  commends1.forEach((cmd1) => {
    commends2.forEach((cmd2) => {
      newCommends.push([...cmd1, ...cmd2]);
    });
  });

  return commandSplicing(newCommends, ...restCommends.slice(2));
}
