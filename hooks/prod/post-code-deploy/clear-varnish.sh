#!/bin/bash

site="$1"
target_env="$2"
source_branch="$3"
deployed_tag="$4"
repo_url="$5"
repo_type="$6"
domain="govcmsnewthemeqc5gsdrz6m.devcloud.acquia-sites.com"

case $target_env in
    'dev' )
        domain="govcmsnewtheme9cb9afxtdi.devcloud.acquia-sites.com"
        ;;
    'test' )
        domain="govcmsnewthemeqc5gsdrz6m.devcloud.acquia-sites.com"
        ;;
esac

drush @$target_env ac-domain-purge $domain
drush @$target_env cc all
