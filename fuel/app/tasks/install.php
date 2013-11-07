<?php

namespace Fuel\Tasks;

class Install
{

	public static function run($skip_prompts=false, $install_widgets=true)
	{
		$writable_paths = [
			APPPATH.'cache',
			APPPATH.'logs',
			APPPATH.'tmp',
			APPPATH.'config',
			// custom materia stuff
			PKGPATH.'materia/media',
			PKGPATH.'materia/media/large',
			PKGPATH.'materia/media/thumbnail'
		];

		foreach ($writable_paths as $path)
		{
			if (@chmod($path, 0777))
			{
				\Cli::write("\t".'Made writable: '.$path, 'green');
			}

			else
			{
				\Cli::write("\t".'Failed to make writable: '.$path, 'red');
			}
		}

		// get the materia admin tasks
		require_once(PKGPATH.'materia/tasks/admin.php');

		// bypass interactive mode with -quiet
		if (\Cli::option('skip_prompts', $skip_prompts) === false)
		{
			\Cli::write('This task builds a working Materia server.', 'green');
			\Cli::write('Runs all database migrations, populates needed data, creates an admin user, and will install the core widgets.');
			if (\Cli::prompt('Continue?', array('y', 'n')) != 'y') return;
		}

		\Fuel\Tasks\Admin::clear_cache();
		\Fuel\Tasks\Admin::setup_migrations();

		$admin_pass = \Cli::option('p');
		\Fuel\Tasks\Admin::populate(true, $admin_pass);

		if (\Cli::option('install_widgets', $install_widgets) === true)
		{
			require_once(PKGPATH.'materia/tasks/widget.php');
			\Fuel\Tasks\Widget::install();
		}
	}
}