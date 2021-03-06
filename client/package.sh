#!/bin/bash -e

function do_preinstall()
{
    apt_get_install wget

    if [ ! -e '/etc/apt/sources.list.d/nodesource.list' ]
    then
        wget -q 'https://deb.nodesource.com/setup' -O - | sudo bash -
    fi
    apt_get_install nodejs
}

function do_install()
{
    if [ "${PRODUCTION}" == true ]
    then
        npm install --production
    else
        npm install
    fi
    node_modules/bower/bin/bower install

    if [ "${PRODUCTION}" == false ]
    then
        run update_webdriver
    fi

    mkdir -p tmp
}

function do_clear()
{
    purge node_modules
    purge app/bower_components
}

function do_test()
{
    run test_single_run
    run protractor
}

function do_test_continously()
{
    npm test "$@"
}

function do_test_single_run()
{
    npm run test-single-run "$@"
}

function do_update_webdriver()
{
    npm run update-webdriver "$@"
}

function do_protractor()
{
    echo 'Info: Have to run StoreKeeper server with default config'
    npm run protractor "$@"
}


cd "$(dirname "$0")"
source ../.main.sh
