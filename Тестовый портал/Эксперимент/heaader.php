<?
//phpinfo();
use Bitrix\Intranet\Integration\Templates\Bitrix24\ThemePicker;
use Bitrix\Main\Config\Option;
use Bitrix\Main\Loader;
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\ModuleManager;
use \Bitrix\Main\Page\AssetLocation;

if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
    die();
}

$asset = \Bitrix\Main\Page\Asset::getInstance();

$rsUser = CUser::GetList(false, false,
    array(
        "ID" => $USER->GetID(),
    ),
    array(
        "SELECT" => array(
            "UF_WHITE_THEME",
        ),
    )
);
if ($arUser = $rsUser->Fetch()) {
    $GLOBALS["UF_WHITE_THEME"]=$arUser["UF_WHITE_THEME"];
}
?>

<?php
//Ajax Performance Optimization
if (isset($_GET['RELOAD']) && $_GET['RELOAD'] == 'Y')
{
    return; //Live Feed Ajax
}
else if (isset($_REQUEST['RELOAD']) && $_REQUEST['RELOAD'] == 'Y')
{
    return;
}
else if (mb_strpos($_SERVER['REQUEST_URI'], '/historyget/') > 0)
{
    return;
}
else if (isset($_GET['IFRAME']) && $_GET['IFRAME'] === 'Y' && !isset($_GET['SONET']))
{
    //For the task iframe popup

    $APPLICATION->SetPageProperty('BodyClass', 'task-iframe-popup');
    $asset->addCss(SITE_TEMPLATE_PATH . '/interface.css', true);
    $asset->addJs(SITE_TEMPLATE_PATH . '/bitrix24.js', true);

    //print SITE_TEMPLATE_PATH;
    return;
}

CModule::IncludeModule('intranet');
\Bitrix\Main\Loader::includeModule('im');
\Bitrix\Main\UI\Extension::load([
    "ui.fonts.opensans",
    "intranet.sidepanel.bitrix24",
    "socialnetwork.slider",
    "calendar.sliderloader",
    "ui.notification",
    "ui.info-helper",
    "ui.design-tokens",
    "ui.tooltip",
    "ui.buttons",
]);

Loc::loadMessages($_SERVER['DOCUMENT_ROOT'] . '/bitrix/templates/' . SITE_TEMPLATE_ID . '/header.php');


function showJsTitle()
{
    /** @global CMain $APPLICATION */
    global $APPLICATION;
    $APPLICATION->AddBufferContent("getJsTitle");
}

function getJsTitle()
{
    /** @global CMain $APPLICATION */
    global $APPLICATION;
    $title = $APPLICATION->GetTitle("title", true);
    $title = html_entity_decode($title, ENT_QUOTES, SITE_CHARSET);
    return CUtil::JSEscape($title);
}
CJSCore::Init(Array("viewer","jquery","BXIM","ajax","tooltip","im"));
?>
<!DOCTYPE html>
<html <?if (LANGUAGE_ID == "tr"):?>lang="<?=LANGUAGE_ID?>"<?endif?>>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
   <?
    $APPLICATION->ShowHead(false);
    $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH."/other/slick/slick.css");
    $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH."/other/slick/slick-theme.css");
    $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH."/css/left_slider.css");
    if($GLOBALS["UF_WHITE_THEME"])
    {
        $bodyClass="white";
        $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH."/css/style_white.css");
    }
    $APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH."/bitrix24.js", true);
    $APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH."/main.js", true);
    $APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH."/other/slick/slick.js", true);
    ?>
    <script>sessionStorage.setItem("UF_WHITE_THEME",<?=$GLOBALS["UF_WHITE_THEME"]?>)</script>
    <?
    //$APPLICATION->ShowHead(false);
    $asset->addCss(SITE_TEMPLATE_PATH . '/interface.css', true);
    //$asset->addJs(SITE_TEMPLATE_PATH . '/bitrix24.js', true);
     ?>
    <title><?$APPLICATION->ShowTitle()?></title>

</head>
<body class="<?=$bodyClass?>">

<div id="header" class="<?$APPLICATION->ShowProperty("HeaderClass");?>">
<!--    панель битрикса-->
    <? if ($USER->IsAdmin() && !defined("SKIP_SHOW_PANEL")):?>
        <div id="panel">
            <?$APPLICATION->ShowPanel();?>
        </div>
    <? endif ?>
    <?if (IsModuleInstalled("im"))
        $APPLICATION->IncludeComponent(
            "ndx:im.messenger",
            "iframe",
            Array(),
            null,
            array("HIDE_ICONS" => "N")
        );
    ?>
    <div id="header-inner">

        <div class="header-logo-block"><?include(__DIR__."/logo.php"); ?></div>

        <div class="header-search">
            <?
            if (!IsModuleInstalled("bitrix24")/*IsModuleInstalled("search")*/)
            {
                $searchParams = array(
                    "NUM_CATEGORIES" => "4",
                    "CATEGORY_3_TITLE" => GetMessage("BITRIX24_SEARCH_MICROBLOG"),
                    "CATEGORY_3" => array(
                        0 => "microblog", 1 => "blog",
                    ),
                );
            }
            else
            {
                $searchParams = array(
                    "NUM_CATEGORIES" => "3",
                );
            }

            $APPLICATION->IncludeComponent(
                (ModuleManager::isModuleInstalled("search") ? "bitrix:search.title" : "bitrix:intranet.search.title"),
                (
                ModuleManager::isModuleInstalled("search")
                && COption::GetOptionString("intranet", "search_title_old", "") == "Y" ? ".default_old" : "betboom_search_title"
                ),
                array_merge(
                    array(
                        "CHECK_DATES" => "N",
                        "SHOW_OTHERS" => "N",
                        "TOP_COUNT" => 7,
                        "CATEGORY_0_TITLE" => GetMessage("BITRIX24_SEARCH_EMPLOYEE"),
                        "CATEGORY_0" => array(
                            0 => "custom_users",
                        ),
                        "CATEGORY_1_TITLE" => GetMessage("BITRIX24_SEARCH_GROUP"),
                        "CATEGORY_1" => array(
                            0 => "custom_sonetgroups",
                        ),
                        "CATEGORY_2_TITLE" => GetMessage("BITRIX24_SEARCH_MENUITEMS"),
                        "CATEGORY_2" => array(
                            0 => "custom_menuitems",
                        ),
                        "CATEGORY_OTHERS_TITLE" => GetMessage("BITRIX24_SEARCH_OTHER"),
                        "SHOW_INPUT" => "N",
                        "INPUT_ID" => "search-textbox-input",
                        "CONTAINER_ID" => "search",
                        "USE_LANGUAGE_GUESS" => (LANGUAGE_ID == "ru") ? "Y" : "N"
                    ),
                    $searchParams),
                false,
                array('HIDE_ICONS' => 'Y')
            );
            ?>
        </div>
        <?
		//if ($USER->GetID()==935 || $USER->GetID()==674 || $USER->GetID()==274)
        $APPLICATION->IncludeComponent("ndx:change.theme", "template1", Array(
	
	),
	null
);
        ?>

        <?
        //This component was used for menu-create-but.
        //We have to include the component before bitrix:timeman for composite mode.
        if (CModule::IncludeModule('tasks') && CBXFeatures::IsFeatureEnabled('Tasks')):
            $APPLICATION->IncludeComponent(
                "bitrix:tasks.iframe.popup",
                ".default",
                array(
                    "ON_TASK_ADDED" => "#SHOW_ADDED_TASK_DETAIL#",
                    "ON_TASK_CHANGED" => "BX.DoNothing",
                    "ON_TASK_DELETED" => "BX.DoNothing"
                ),
                null,
                array("HIDE_ICONS" => "Y")
            );
        endif;

        if ($isExtranet)
        {

            if (!ModuleManager::isModuleInstalled("timeman") ||
                !$APPLICATION->IncludeComponent('bitrix:timeman', 'bitrix24', array(), false, array("HIDE_ICONS" => "Y" ))
            )
            {
                $APPLICATION->IncludeComponent('bitrix:planner', 'bitrix24', array(), false, array("HIDE_ICONS" => "Y"));
            }
        }
        else
        {
            CJSCore::Init("timer");?>
            <div class="timeman-container timeman-container-<?=LANGUAGE_ID?><?=(IsAmPmMode() ? " am-pm-mode" : "")?>"
                    id="timeman-container">
                <div class="timeman-wrap">
								<span id="timeman-block" class="timeman-block">
									<span class="bx-time" id="timeman-timer"></span>
								</span>
                </div>
            </div>
            <script type="text/javascript">BX.ready(function() {
                    BX.timer.registerFormat("bitrix24_time", B24.Timemanager.formatCurrentTime);
                    BX.timer({
                        container: BX("timeman-timer"),
                        display : "bitrix24_time"
                    });
                });</script>
            <?
        }
        ?>
        <!--suppress CheckValidXmlInScriptTagBody -->
        <script type="text/javascript" data-skip-moving="true">
            (function() {
                var isAmPmMode = <?=(IsAmPmMode() ? "true" : "false") ?>;
                var time = document.getElementById("timeman-timer");
                var hours = new Date().getHours();
                var minutes = new Date().getMinutes();
                if (time)
                {
                    time.innerHTML = formatTime(hours, minutes, 0, isAmPmMode);
                }
                else if (document.addEventListener)
                {
                    document.addEventListener("DOMContentLoaded", function() {
                        time.innerHTML = formatTime(hours, minutes, 0, isAmPmMode);
                    });
                }

                function formatTime(hours, minutes, seconds, isAmPmMode)
                {
                    var ampm = "";
                    if (isAmPmMode)
                    {

                        ampm = hours >= 12 ? "PM" : "AM";
                        ampm = '<span class="time-am-pm">' + ampm + '</span>';
                        hours = hours % 12;
                        hours = hours ? hours : 12;
                    }
                    else
                    {
                        hours = hours < 10 ? "0" + hours : hours;
                    }

                    return	'<span class="time-hours">' + hours + '</span>' + '<span class="time-semicolon">:</span>' +
                        '<span class="time-minutes">' + (minutes < 10 ? "0" + minutes : minutes) + '</span>' + ampm;
                }
            })();
        </script>
        <span class="menu-user-buttom">
        <a href="/auth/?logout=yes&sessid=<?=bitrix_sessid()?>&backurl=<?=$arResult["BACKURL"]?>">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 17L4.00002 17C3.44774 17 3.00003 16.5523 3.00003 16L3 4.00038C3 3.44812 3.44768 3.00042 3.99994 3.00038L9 3.00005" stroke="#F3F3F3" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 14L18 10L14 6" stroke="#F3F3F3" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 10L8 10" stroke="#F3F3F3" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </a>
        </span>
        
							<?$APPLICATION->IncludeComponent("ndx:notification.header",".default",[],false)?>
        <div class="header-personal">
            <?
            $profileLink = $isExtranet ? SITE_DIR."contacts/personal" : SITE_DIR."company/personal";
            $APPLICATION->IncludeComponent(
                "bitrix:system.auth.form",
                "work_position",
                array(
                    "PATH_TO_SONET_PROFILE" => $profileLink."/user/#user_id#/",
                    "PATH_TO_SONET_PROFILE_EDIT" => $profileLink."/user/#user_id#/edit/",
                ),
                false
            );
            ?>
            </div>
        </div>
    </div>
</div>

<div class="main-content-wrap <?$APPLICATION->ShowProperty("ContainerWrapClass");?>">
    <div  id="main-content" class="main-content <?=$APPLICATION->get_cookie("main_menu")=="true" || empty($APPLICATION->get_cookie("main_menu")) ? "menu-block-active" :"" ?>  <?$APPLICATION->ShowProperty("ContainerClass");?>">
        <?$APPLICATION->IncludeComponent(
            "bitrix:menu",
            "vertical-betboom",
            Array(
                "ALLOW_MULTI_SELECT" => "N",
                "CHILD_MENU_TYPE" => "top",
                "DELAY" => "N",
                "MAX_LEVEL" => "1",
                "MENU_CACHE_GET_VARS" => array(""),
                "MENU_CACHE_TIME" => "3600",
                "MENU_CACHE_TYPE" => "A",
                "MENU_CACHE_USE_GROUPS" => "Y",
                "ROOT_MENU_TYPE" => "top",
                "USE_EXT" => "N"
            )
        );?>
        <?if (!defined("ERROR_404")):?>
        <div class="content-wrap">
            <div class="content">
                <? if ($APPLICATION->GetCurPage(false) !== '/'): ?>
                <div class="main-content-item">
                   <?if($APPLICATION->GetCurPage(false)!='/new_employee/'):?>
                    <?$APPLICATION->IncludeComponent("bitrix:breadcrumb","",Array(
                            "START_FROM" => "0",
                            "PATH" => "",
                            "SITE_ID" => "s1"
                        )
                    );?>
                   <?endif;?>
                    <?endif;?>
        <?endif;?>
