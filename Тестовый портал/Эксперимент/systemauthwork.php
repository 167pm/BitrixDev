<?
use Bitrix\Intranet\Integration\Templates\Bitrix24\ThemePicker;
use \Bitrix\Intranet\Binding;
use \Bitrix\ImBot\Bot\Partner24;
\Bitrix\Main\UI\Extension::load("ui.icons.b24");

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
{
	die();
}

if (!$USER->IsAuthorized())
{
?>
	<div class="authorization-block"><a href="<?=(SITE_DIR."auth/?backurl=".$arResult["BACKURL"])?>" class="authorization-text"><?=GetMessage("AUTH_AUTH")?></a></div>
<?
	return;
}

\CJSCore::init("sidepanel");

$bitrix24Included = \Bitrix\Main\Loader::includeModule('bitrix24');

$videoSteps = array(
	array(
		"id" => "start",
		"patterns" => array(),
		"learning_path" => "/start/",
		"title" => GetMessage("BITRIX24_HELP_VIDEO_TITLE_1"),
		"title_full" => GetMessage("BITRIX24_HELP_VIDEO_TITLE_FULL_1"),
		"youtube" => GetMessage("BITRIX24_HELP_VIDEO_1")
	),
	array(
		"id" => "tasks",
		"learning_path" => "/tasks/",
		"patterns" => array(
			"~^".SITE_DIR."(company|contacts)/personal/user/\\d+/tasks/~",
			"~^".SITE_DIR."workgroups/group/\\d+/tasks/~"
		),
		"title" => GetMessage("BITRIX24_HELP_VIDEO_TITLE_2"),
		"title_full" => GetMessage("BITRIX24_HELP_VIDEO_TITLE_FULL_2"),
		"youtube" => GetMessage("BITRIX24_HELP_VIDEO_2")
	),
	array(
		"id" => "calendar",
		"learning_path" => "/calendar/",
		"patterns" => array(
			"~^".SITE_DIR."(company|contacts)/personal/user/\\d+/calendar/~",
			"~^".SITE_DIR."workgroups/group/\\d+/calendar/~"
		),
		"title" => GetMessage("BITRIX24_HELP_VIDEO_TITLE_3"),
		"title_full" => GetMessage("BITRIX24_HELP_VIDEO_TITLE_FULL_3"),
		"youtube" => GetMessage("BITRIX24_HELP_VIDEO_3")
	),
	array(
		"id" => "docs",
		"learning_path" => "/docs/",
		"patterns" => array(
			"~^".SITE_DIR."(company|contacts)/personal/user/\\d+/disk/~",
			"~^".SITE_DIR."docs/~",
			"~^".SITE_DIR."workgroups/group/\\d+/disk/~"
		),
		"title" => GetMessage("BITRIX24_HELP_VIDEO_TITLE_4"),
		"title_full" => GetMessage("BITRIX24_HELP_VIDEO_TITLE_FULL_4"),
		"youtube" => GetMessage("BITRIX24_HELP_VIDEO_4")
	),
	array(
		"id" => "crm",
		"learning_path" => "/crm/",
		"patterns" => array("~^".SITE_DIR."crm/~"),
		"title" => GetMessage("BITRIX24_HELP_VIDEO_TITLE_14"),
		"title_full" => GetMessage("BITRIX24_HELP_VIDEO_TITLE_FULL_14"),
		"youtube" => GetMessage("BITRIX24_HELP_VIDEO_14")
	)
);

if (LANGUAGE_ID == "ru" || LANGUAGE_ID == "ua")
{
	$videoSteps[] = array(
		"id" => "company_struct",
		"learning_path" => "/company/vis_structure.php",
		"patterns" => $USER->CanDoOperation("bitrix24_invite") ? array("~^".SITE_DIR."company/vis_structure.php~") : array(),
		"title" => GetMessage("BITRIX24_HELP_VIDEO_TITLE_13"),
		"title_full" => GetMessage("BITRIX24_HELP_VIDEO_TITLE_FULL_13"),
		"youtube" => GetMessage("BITRIX24_HELP_VIDEO_13")
	);

	$videoSteps[] = array(
		"id" => "marketplace",
		"learning_path" => "/marketplace/",
		"patterns" => array("~^".SITE_DIR."marketplace/~"),
		"title" => GetMessage("BITRIX24_HELP_VIDEO_TITLE_15"),
		"title_full" => GetMessage("BITRIX24_HELP_VIDEO_TITLE_FULL_15"),
		"youtube" => GetMessage("BITRIX24_HELP_VIDEO_15")
	);

	$videoSteps[] = array(
		"id" => "im",
		"learning_path" => "",
		"patterns" => array(),
		"title" => GetMessage("BITRIX24_HELP_VIDEO_TITLE_16"),
		"title_full" => GetMessage("BITRIX24_HELP_VIDEO_TITLE_FULL_16"),
		"youtube" => GetMessage("BITRIX24_HELP_VIDEO_16")
	);
}
else
{
	$addVideo = array(
		"5" => array("crm_import", array(), "/crm/import/"),
		"6" => array("crm_email", array(), "/crm/email/"),
		"7" => array("crm_perms", array("~^".SITE_DIR."crm/configs/perms/~"), "/crm/configs/perms/"),
		"8" => array("crm_lists", array("~^".SITE_DIR."crm/configs/status/~"), "/crm/lists/"),
		"9" => array("crm_bp", array("~^".SITE_DIR."crm/configs/bp/~"), "/crm/configs/bp/"),
		"10" => array("im", array(), "/im/"),
		"11" => array("lists", array("~^".SITE_DIR."company/lists/~"), "/company/lists/"),
		"12" => array("twitter", array(), "/twitter/")
	);

	foreach ($addVideo as $number => $ids)
	{
		$videoSteps[] = array(
			"id" => $ids[0],
			"patterns" => $ids[1],
			"learning_path" => $ids[2],
			"title" => GetMessage("BITRIX24_HELP_VIDEO_TITLE_".$number),
			"title_full" => GetMessage("BITRIX24_HELP_VIDEO_TITLE_FULL_".$number),
			"youtube" => GetMessage("BITRIX24_HELP_VIDEO_".$number)
		);
	}
}
?>

<script type="text/javascript">
	function showUserMenu()
	{
		var bindElement = BX("user-block");
		BX.addClass(bindElement, "user-block-active");
		BX.PopupMenu.show("user-menu", bindElement, [
			{
				text : "<?=GetMessageJS("AUTH_PROFILE")?>",
				className : "menu-popup-no-icon",
				href: "<?=CComponentEngine::MakePathFromTemplate($arParams['PATH_TO_SONET_PROFILE'], array("user_id" => $USER->GetID()))?>"
			},
			<?if (!$bitrix24Included && $USER->isAdmin()):?>
				{ text : "<?=GetMessageJS("AUTH_ADMIN_SECTION")?>", className : "menu-popup-no-icon", href : "/bitrix/admin/"},
			<?endif?>
			<?if ($arResult["SHOW_LICENSE_BUTTON"]):
				$arJsParams = array(
					"LICENSE_PATH" => $arResult["B24_LICENSE_PATH"],
					"COUNTER_URL" => $arResult["LICENSE_BUTTON_COUNTER_URL"],
					"HOST" => $arResult["HOST_NAME"]
				);
			?>
				{ text : "<?=GetMessageJS("B24_UPGRADE_LICENSE")?>", className : "menu-popup-no-icon", onclick : "if (BX.getClass('B24.upgradeButtonRedirect')) B24.upgradeButtonRedirect(<?=CUtil::PhpToJSObject($arJsParams)?>)"},
			<?endif?>

				{ text : "<?=GetMessageJS("AUTH_LOGOUT")?>", className : "menu-popup-no-icon", href : "/auth/?logout=yes&sessid=" + BX.bitrix_sessid() + "&backurl=" + encodeURIComponent(B24.getBackUrl()) }
			],
			{
				offsetTop: 20,
				offsetLeft:10,
				angle:false,
				events: {
					onPopupClose : function() {
						BX.removeClass(this.bindElement, "user-block-active");
					}
				}
		});
	}
</script>



<?//onclick="showUserMenu()"?>
<div class="user-block">
	<span class="ui-icon ui-icon-common-user user-img"><?php
		$style = (
			$arResult['USER_PERSONAL_PHOTO_SRC']
				? "background: url('" . $arResult['USER_PERSONAL_PHOTO_SRC']. "') no-repeat center; background-size: cover;"
				: ''
		);
		?><i style="<?= $style ?>"></i>
	</span>
    <span id="user-block"></span>
    <div class="name-work-block">
    <span class="user-name" id="user-name"><a href="<?=CComponentEngine::MakePathFromTemplate($arParams['PATH_TO_SONET_PROFILE'], array("user_id" => $USER->GetID()))?>"><?=$arResult["USER_NAME"]?></a></span>
    <?if($arResult["WORK_POSITION"]):?>
    <span class="work-position" id="work-position"><?=$arResult["WORK_POSITION"]?></span>
    <?endif;?>
    </div>
</div>




<?
$imBarExists =
	CModule::IncludeModule("im") &&
	CBXFeatures::IsFeatureEnabled("WebMessenger") &&
	!defined("BX_IM_FULLSCREEN")
;

if ($imBarExists)
{
	$this->setViewTarget("im", 200);
}
else
{
	?>
	<div class="help-block" id="bx-help-block" title="<?=GetMessage("AUTH_HELP")?>">
		<div class="help-icon-border"></div>
		<div class="help-block-icon"></div>
		<div class="help-block-counter-wrap" id="bx-help-notify">
		</div>
	</div>
	<?
}

$frame = $this->createFrame("b24_helper")->begin("");

	$supportBotId = 0;
	if (\Bitrix\Main\Loader::includeModule("imbot"))
	{
		if (
			class_exists('\\Bitrix\\ImBot\\Bot\\Support24')
			&& \Bitrix\ImBot\Bot\Support24::getSupportLevel() == \Bitrix\ImBot\Bot\Support24::SUPPORT_LEVEL_PAID
			&& \Bitrix\ImBot\Bot\Support24::isEnabled()
		)
		{
			$supportBotId = (int)\Bitrix\ImBot\Bot\Support24::getBotId();
		}
		else if (
			method_exists('\\Bitrix\\ImBot\\Bot\\SupportBox', 'isEnabled')
			&& \Bitrix\ImBot\Bot\SupportBox::isEnabled()
		)
		{
			$supportBotId = (int)\Bitrix\ImBot\Bot\SupportBox::getBotId();
		}
	}

	$isAdmin = ($bitrix24Included && CBitrix24::IsPortalAdmin($USER->GetID()) || !$bitrix24Included && $USER->IsAdmin()) ? 1 : 0;

	CJSCore::Init(array('helper'));

	$helpUrl = $arResult["HELPDESK_URL"]."/widget2/";
	$helpUrlParameters = [
		"url" => "https://".$_SERVER["HTTP_HOST"].$APPLICATION->GetCurPageParam(),
		"is_admin" => $isAdmin,
		"user_id" => $USER->GetID(),
		"user_email" => $USER->GetEmail(),
		"tariff" => COption::GetOptionString("main", "~controller_group_name", ""),
		"is_cloud" => $bitrix24Included ? "1" : "0",
		"support_bot" => $supportBotId,
	];
	$imBotIncluded = \Bitrix\Main\Loader::includeModule('imbot');
	if($imBotIncluded)
	{
		$helpUrlParameters['support_partner_code'] = Partner24::getBotCode();
		$supportPartnerName = $APPLICATION->ConvertCharsetArray(Partner24::getPartnerName(), SITE_CHARSET, 'utf-8');
		$helpUrlParameters['support_partner_name'] = $supportPartnerName;
	}
	$helpUrl = CHTTP::urlAddParams($helpUrl, $helpUrlParameters, ["encode" => true]);

	$frameOpenUrl = CHTTP::urlAddParams($helpUrl, array(
			"action" => "open",
		)
	);
	$frameCloseUrl = CHTTP::urlAddParams($helpUrl, array(
			"action" => "close",
		)
	);

	$host = $bitrix24Included && defined("BX24_HOST_NAME") ? BX24_HOST_NAME : CIntranetUtils::getHostName();
	$notifyData = array(
		"support_bot" => $supportBotId,
		"is_admin" => $isAdmin,
		"user_id" => $USER->GetID(),
		"user_email" => $USER->GetEmail(),
		"tariff" => COption::GetOptionString("main", "~controller_group_name", ""),
		"host" => $host,
		"key" => $bitrix24Included ? CBitrix24::RequestSign($host.$USER->GetID()) : md5($host.$USER->GetID().'BX_USER_CHECK'),
		"is_cloud" => $bitrix24Included ? "1" : "0",
		"user_date_register" => $arResult["USER_DATE_REGISTER"],
		"portal_date_register" => $bitrix24Included ? COption::GetOptionString("main", "~controller_date_create", "") : "",
		"partner_link" => COption::GetOptionString("bitrix24", "partner_id", 0) ? 'Y' : 'N',
		"counter_update_date" => $arResult["COUNTER_UPDATE_DATE"],
	);
	if($imBotIncluded)
	{
		$notifyData['support_partner_code'] = $helpUrlParameters['support_partner_code'];
		$notifyData['support_partner_name'] = $helpUrlParameters['support_partner_name'];
	}
	?>
	<script>
		BX.message({
			HELPER_LOADER: '<?=GetMessageJS('B24_HELP_LOADER')?>',
			HELPER_TITLE: '<?=GetMessageJS('B24_HELP_TITLE_NEW')?>'
		});
		BX.Helper.init({
			frameOpenUrl : '<?=CUtil::JSEscape($frameOpenUrl)?>',
			helpBtn : BX('bx-help-block'),
			notifyBlock : BX('bx-help-notify'),
			langId: '<?=LANGUAGE_ID?>',
			ajaxUrl: '<?=$this->GetFolder()."/ajax.php"?>',
			needCheckNotify: '<?=($arResult["NEED_CHECK_HELP_NOTIFICATION"] == "Y" ? "Y" : "N")?>',
			notifyNum: '<?=CUtil::JSEscape($arResult["HELP_NOTIFY_NUM"])?>',
			notifyData: <?=CUtil::PhpToJSObject($notifyData)?>,
			notifyUrl: '<?=$arResult["HELPDESK_URL"]."/widget2/notify.php"?>',
			helpUrl: '<?=$arResult["HELPDESK_URL"]?>',
			runtimeUrl: '//helpdesk.bitrix24.ru/widget/hero/runtime.js'
		});

		<?if ($arResult["OPEN_HELPER_AFTER_PAGE_LOADING"]):?>
			BX.ready(function() {
				BX.Helper.show();
			});
		<?endif;?>
		<?
		if ($supportBotId && $_REQUEST['support_chat'])
			echo 'BX.addCustomEvent("onImInit", function(BXIM) {BXIM.openMessenger('.$supportBotId.');});';
		?>
	</script>
<?
if ($arResult["CAN_HAVE_HELP_NOTIFICATIONS"] === 'Y')
{
	//if something getting wrong in JS - this parameter can actualize script
	$scriptCacheTime = 259200; //script lifetime 60 * 60 * 24 * 3 = 72h
	$managerScriptUrl = $arResult["HELPDESK_URL"].
						'/bitrix/js/update_actual/help/notification/manager.js?'.
						(floor(time() / $scriptCacheTime));

	$jsNotificationParams = array(
		'lastCheckNotificationsTime' => $arResult['LAST_CHECK_NOTIFICATIONS_TIME'],
		'currentNotificationsString' => $arResult['CURRENT_HELP_NOTIFICATIONS'],
		'managerScriptUrl' => $managerScriptUrl,
		'maxScriptCacheTime' => $scriptCacheTime,
		'timeNow' => time(),
	);
	\CJSCore::Init(array('intranet.helper.notification'));
	?>
	<script>
		BX.ready(function() {
			BX.Intranet.Helper.Notification.Kernel.initLoader(<?=\Bitrix\Main\Web\Json::encode($jsNotificationParams);?>);
		});
	</script>
	<?
}

$frame->end();

if ($imBarExists)
{
	$this->endViewTarget();
}
