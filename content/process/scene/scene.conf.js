var conf =
{
	'state': true,
	'pos': 10, // process launching order
	'restart': 'none', // none,
	'attempt': 0, // 0 = infinite, 1 = 1 attempt, undefined = none
	'delay': 1000, // MILLISECOND
	'cmd': __dirname + "/bin/FortressScene.exe", // process to exec
	'args': [], // array with args
	'log': 'all', // error, info, all,
	'option':
	{
		// OPTION CHILD.SPAWN
		'cwd': __dirname,
	},
	onClose: function()
	{
		process.exit();
	},
	onError: function(err)
	{
		console.log(err.toString());
	},
}

module.exports = conf;
