throw new Error('OS NOT YET IMPLEMENTED.');

(function realizeTildeFunctor_win() {
  const joiner =
    process.env.USERPROFILE ?
      function _userProfile_joiner(up) {
        return path.join(process.env.USERPROFILE, up);
      } :
      function _homeDriveHomePath_joiner(hdhp) {
        return path.join(process.env.HOMEDRIVE, process.env.HOMEPATH, hdhp);
      };

  return function _realizeTilde_win(filepath) {
    if (filepath[0] === '~') {
      return joiner(filepath.slice(1));
    }
    return filepath;
  }
})();
