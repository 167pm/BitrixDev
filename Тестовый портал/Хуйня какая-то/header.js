; /* Start:"a:4:{s:4:"full";s:67:"/bitrix/components/bitrix/search.title/script.min.js?15961072836443";s:6:"source";s:48:"/bitrix/components/bitrix/search.title/script.js";s:3:"min";s:52:"/bitrix/components/bitrix/search.title/script.min.js";s:3:"map";s:52:"/bitrix/components/bitrix/search.title/script.map.js";}"*/
function JCTitleSearch(t){var e=this;this.arParams={AJAX_PAGE:t.AJAX_PAGE,CONTAINER_ID:t.CONTAINER_ID,INPUT_ID:t.INPUT_ID,MIN_QUERY_LEN:parseInt(t.MIN_QUERY_LEN)};if(t.WAIT_IMAGE)this.arParams.WAIT_IMAGE=t.WAIT_IMAGE;if(t.MIN_QUERY_LEN<=0)t.MIN_QUERY_LEN=1;this.cache=[];this.cache_key=null;this.startText="";this.running=false;this.runningCall=false;this.currentRow=-1;this.RESULT=null;this.CONTAINER=null;this.INPUT=null;this.WAIT=null;this.ShowResult=function(t){if(BX.type.isString(t)){e.RESULT.innerHTML=t}e.RESULT.style.display=e.RESULT.innerHTML!==""?"block":"none";var s=e.adjustResultNode();var i;var n;var l=BX.findChild(e.RESULT,{tag:"table",class:"title-search-result"},true);if(l){n=BX.findChild(l,{tag:"th"},true)}if(n){var r=BX.pos(l);r.width=r.right-r.left;var a=BX.pos(n);a.width=a.right-a.left;n.style.width=a.width+"px";e.RESULT.style.width=s.width+a.width+"px";e.RESULT.style.left=s.left-a.width-1+"px";if(r.width-a.width>s.width)e.RESULT.style.width=s.width+a.width-1+"px";r=BX.pos(l);i=BX.pos(e.RESULT);if(i.right>r.right){e.RESULT.style.width=r.right-r.left+"px"}}var o;if(l)o=BX.findChild(e.RESULT,{class:"title-search-fader"},true);if(o&&n){i=BX.pos(e.RESULT);o.style.left=i.right-i.left-18+"px";o.style.width=18+"px";o.style.top=0+"px";o.style.height=i.bottom-i.top+"px";o.style.display="block"}};this.onKeyPress=function(t){var s=BX.findChild(e.RESULT,{tag:"table",class:"title-search-result"},true);if(!s)return false;var i;var n=s.rows.length;switch(t){case 27:e.RESULT.style.display="none";e.currentRow=-1;e.UnSelectAll();return true;case 40:if(e.RESULT.style.display=="none")e.RESULT.style.display="block";var l=-1;for(i=0;i<n;i++){if(!BX.findChild(s.rows[i],{class:"title-search-separator"},true)){if(l==-1)l=i;if(e.currentRow<i){e.currentRow=i;break}else if(s.rows[i].className=="title-search-selected"){s.rows[i].className=""}}}if(i==n&&e.currentRow!=i)e.currentRow=l;s.rows[e.currentRow].className="title-search-selected";return true;case 38:if(e.RESULT.style.display=="none")e.RESULT.style.display="block";var r=-1;for(i=n-1;i>=0;i--){if(!BX.findChild(s.rows[i],{class:"title-search-separator"},true)){if(r==-1)r=i;if(e.currentRow>i){e.currentRow=i;break}else if(s.rows[i].className=="title-search-selected"){s.rows[i].className=""}}}if(i<0&&e.currentRow!=i)e.currentRow=r;s.rows[e.currentRow].className="title-search-selected";return true;case 13:if(e.RESULT.style.display=="block"){for(i=0;i<n;i++){if(e.currentRow==i){if(!BX.findChild(s.rows[i],{class:"title-search-separator"},true)){var a=BX.findChild(s.rows[i],{tag:"a"},true);if(a){window.location=a.href;return true}}}}}return false}return false};this.onTimeout=function(){e.onChange(function(){setTimeout(e.onTimeout,500)})};this.onChange=function(t){if(e.running){e.runningCall=true;return}e.running=true;if(e.INPUT.value!=e.oldValue&&e.INPUT.value!=e.startText){e.oldValue=e.INPUT.value;if(e.INPUT.value.length>=e.arParams.MIN_QUERY_LEN){e.cache_key=e.arParams.INPUT_ID+"|"+e.INPUT.value;if(e.cache[e.cache_key]==null){if(e.WAIT){var s=BX.pos(e.INPUT);var i=s.bottom-s.top-2;e.WAIT.style.top=s.top+1+"px";e.WAIT.style.height=i+"px";e.WAIT.style.width=i+"px";e.WAIT.style.left=s.right-i+2+"px";e.WAIT.style.display="block"}BX.ajax.post(e.arParams.AJAX_PAGE,{ajax_call:"y",INPUT_ID:e.arParams.INPUT_ID,q:e.INPUT.value,l:e.arParams.MIN_QUERY_LEN},function(s){e.cache[e.cache_key]=s;e.ShowResult(s);e.currentRow=-1;e.EnableMouseEvents();if(e.WAIT)e.WAIT.style.display="none";if(!!t)t();e.running=false;if(e.runningCall){e.runningCall=false;e.onChange()}});return}else{e.ShowResult(e.cache[e.cache_key]);e.currentRow=-1;e.EnableMouseEvents()}}else{e.RESULT.style.display="none";e.currentRow=-1;e.UnSelectAll()}}if(!!t)t();e.running=false};this.onScroll=function(){if(BX.type.isElementNode(e.RESULT)&&e.RESULT.style.display!=="none"&&e.RESULT.innerHTML!==""){e.adjustResultNode()}};this.UnSelectAll=function(){var t=BX.findChild(e.RESULT,{tag:"table",class:"title-search-result"},true);if(t){var s=t.rows.length;for(var i=0;i<s;i++)t.rows[i].className=""}};this.EnableMouseEvents=function(){var t=BX.findChild(e.RESULT,{tag:"table",class:"title-search-result"},true);if(t){var s=t.rows.length;for(var i=0;i<s;i++)if(!BX.findChild(t.rows[i],{class:"title-search-separator"},true)){t.rows[i].id="row_"+i;t.rows[i].onmouseover=function(t){if(e.currentRow!=this.id.substr(4)){e.UnSelectAll();this.className="title-search-selected";e.currentRow=this.id.substr(4)}};t.rows[i].onmouseout=function(t){this.className="";e.currentRow=-1}}}};this.onFocusLost=function(t){setTimeout(function(){e.RESULT.style.display="none"},250)};this.onFocusGain=function(){if(e.RESULT.innerHTML.length)e.ShowResult()};this.onKeyDown=function(t){if(!t)t=window.event;if(e.RESULT.style.display=="block"){if(e.onKeyPress(t.keyCode))return BX.PreventDefault(t)}};this.adjustResultNode=function(){if(!(BX.type.isElementNode(e.RESULT)&&BX.type.isElementNode(e.CONTAINER))){return{top:0,right:0,bottom:0,left:0,width:0,height:0}}var t=BX.pos(e.CONTAINER);e.RESULT.style.position="absolute";e.RESULT.style.top=t.bottom+2+"px";e.RESULT.style.left=t.left+"px";e.RESULT.style.width=t.width+"px";return t};this._onContainerLayoutChange=function(){if(BX.type.isElementNode(e.RESULT)&&e.RESULT.style.display!=="none"&&e.RESULT.innerHTML!==""){e.adjustResultNode()}};this.Init=function(){this.CONTAINER=document.getElementById(this.arParams.CONTAINER_ID);BX.addCustomEvent(this.CONTAINER,"OnNodeLayoutChange",this._onContainerLayoutChange);this.RESULT=document.body.appendChild(document.createElement("DIV"));this.RESULT.className="title-search-result";this.INPUT=document.getElementById(this.arParams.INPUT_ID);this.startText=this.oldValue=this.INPUT.value;BX.bind(this.INPUT,"focus",function(){e.onFocusGain()});BX.bind(this.INPUT,"blur",function(){e.onFocusLost()});this.INPUT.onkeydown=this.onKeyDown;if(this.arParams.WAIT_IMAGE){this.WAIT=document.body.appendChild(document.createElement("DIV"));this.WAIT.style.backgroundImage="url('"+this.arParams.WAIT_IMAGE+"')";if(!BX.browser.IsIE())this.WAIT.style.backgroundRepeat="none";this.WAIT.style.display="none";this.WAIT.style.position="absolute";this.WAIT.style.zIndex="1100"}BX.bind(this.INPUT,"bxchange",function(){e.onChange()});var t=BX.findParent(this.CONTAINER,BX.is_fixed);if(BX.type.isElementNode(t)){BX.bind(window,"scroll",BX.throttle(this.onScroll,100,this))}};BX.ready(function(){e.Init(t)})}
/* End */
;
; /* Start:"a:4:{s:4:"full";s:103:"/bitrix/templates/betboom/components/bitrix/search.title/betboom_search_title/script.js?167135489450293";s:6:"source";s:87:"/bitrix/templates/betboom/components/bitrix/search.title/betboom_search_title/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
BX.namespace("BX.IntranetModify.SearchTitle");

BX.IntranetModify.SearchTitle = function(arParams)
{
	var _this = this;
	this.arParams = {
		'AJAX_PAGE': arParams.AJAX_PAGE,
		'CONTAINER_ID': arParams.CONTAINER_ID,
		'INPUT_ID': arParams.INPUT_ID,
		'MIN_QUERY_LEN': parseInt(arParams.MIN_QUERY_LEN),
		'FORMAT': (typeof arParams.FORMAT != 'undefined' && arParams.FORMAT == 'json' ? 'json' : 'html'),
		'CATEGORIES_ALL': (typeof arParams.CATEGORIES_ALL != 'undefined' ? arParams.CATEGORIES_ALL : []),
		'USER_URL': (typeof arParams.USER_URL != 'undefined' ? arParams.USER_URL : ''),
		'GROUP_URL': (typeof arParams.GROUP_URL != 'undefined' ? arParams.GROUP_URL : ''),
		'WAITER_TEXT': (typeof arParams.WAITER_TEXT != 'undefined' ? arParams.WAITER_TEXT : ''),
		'CURRENT_TS': parseInt(arParams.CURRENT_TS),
		'GLOBAL_SEARCH_CATEGORIES': (typeof arParams.GLOBAL_SEARCH_CATEGORIES == 'object' ? arParams.GLOBAL_SEARCH_CATEGORIES : []),
		'MORE_USERS_URL': arParams.MORE_USERS_URL,
		'MORE_GROUPS_URL': arParams.MORE_GROUPS_URL || "",
		'IS_CRM_INSTALLED': arParams.IS_CRM_INSTALLED == "Y"
	};

	// !!! check this out !!!
	if(arParams.MIN_QUERY_LEN <= 0)
		arParams.MIN_QUERY_LEN = 1;

	this.cache = [];
	this.cache_key = null;

	this.startText = '';
	this.currentRow = -1;
	this.RESULT = null;
	this.CONTAINER = null;
	this.INPUT = null;
	this.xhr = null;
	this.blockAjax = false;
	this.searchStarted = false;
	this.ITEMS = {
		obClientDb: null,
		obClientDbData: {},
		obClientDbDataSearchIndex: {},
		bMenuInitialized: false,
		initialized: {
			sonetgroups: false,
			menuitems: false
		},
		oDbSearchResult: {}
	};
	this.searchByAjax = false;
	this.selectedItemDataId = null;//0;
	this.timeman = null;
	this.userBlock = null;
	this.header = null;

	this.CreateResultWrap = function()
	{
		if (_this.RESULT == null)
		{
			this.RESULT = document.body.appendChild(document.createElement("DIV"));
			this.RESULT.className = 'title-search-result title-search-result-header search-title-top-result-header';
		}
	};

	this.MakeResultFromClientDB = function(arSearchStringAlternatives, searchStringOriginal)
	{
		var result = null;

		var key, i, j, entityCode, prefix = null;
		for (key = 0; key < arSearchStringAlternatives.length; key++)
		{
			var searchString = arSearchStringAlternatives[key].toLowerCase();
			if (
				typeof _this.ITEMS.oDbSearchResult[searchString] != 'undefined'
				&& _this.ITEMS.oDbSearchResult[searchString].length > 0 // results from local DB
			)
			{
				for (i=0;i<_this.ITEMS.oDbSearchResult[searchString].length;i++)
				{
					entityCode =_this.ITEMS.oDbSearchResult[searchString][i];
					prefix = entityCode.substr(0, 1);

					for (j=0;j<_this.arParams.CATEGORIES_ALL.length;j++)
					{
						if (
							typeof _this.arParams.CATEGORIES_ALL[j].CLIENTDB_PREFIX != 'undefined'
							&& _this.arParams.CATEGORIES_ALL[j].CLIENTDB_PREFIX == prefix
						)
						{
							if (result == null)
							{
								result = {};
							}
							if (typeof result.CATEGORIES == 'undefined')
							{
								result.CATEGORIES = {};
							}
							if (typeof result.CATEGORIES[j] == 'undefined')
							{
								result.CATEGORIES[j] = {
									ITEMS: [],
									TITLE : _this.arParams.CATEGORIES_ALL[j].TITLE
								};
							}

							if (prefix == "U")
							{
								result.CATEGORIES[j].ITEMS.push({
									ICON: (typeof _this.ITEMS.obClientDbData.users[entityCode].avatar != 'undefined' ? _this.ITEMS.obClientDbData.users[entityCode].avatar : ''),
									ITEM_ID:  entityCode,
									MODULE_ID: '',
									NAME: _this.ITEMS.obClientDbData.users[entityCode].name,
									PARAM1: '',
									URL: _this.arParams.USER_URL.replace('#user_id#', _this.ITEMS.obClientDbData.users[entityCode].entityId),
									TYPE: 'users'
								});
							}
							else if (prefix == "G")
							{
								if (
									typeof _this.ITEMS.obClientDbData.sonetgroups[entityCode].site != 'undefined'
									&& _this.ITEMS.obClientDbData.sonetgroups[entityCode].site == BX.message('SITE_ID')
								)
								{
									result.CATEGORIES[j].ITEMS.push({
										ICON: (typeof _this.ITEMS.obClientDbData.sonetgroups[entityCode].avatar != 'undefined' ? _this.ITEMS.obClientDbData.sonetgroups[entityCode].avatar : ''),
										ITEM_ID:  entityCode,
										MODULE_ID: '',
										NAME: _this.ITEMS.obClientDbData.sonetgroups[entityCode].name,
										PARAM1: '',
										URL: _this.arParams.GROUP_URL.replace('#group_id#', _this.ITEMS.obClientDbData.sonetgroups[entityCode].entityId),
										TYPE: 'sonetgroups',
										IS_MEMBER: (typeof _this.ITEMS.obClientDbData.sonetgroups[entityCode].isMember != 'undefined' && _this.ITEMS.obClientDbData.sonetgroups[entityCode].isMember == 'Y' ? 1 : 0)
									});
								}
							}
							else if (prefix == "M")
							{
								result.CATEGORIES[j].ITEMS.push({
									ICON: '',
									ITEM_ID:  entityCode,
									MODULE_ID: '',
									NAME: _this.ITEMS.obClientDbData.menuitems[entityCode].name,
									PARAM1: '',
									URL: _this.ITEMS.obClientDbData.menuitems[entityCode].entityId,
									CHAIN: (typeof _this.ITEMS.obClientDbData.menuitems[entityCode].chain != 'undefined' ? _this.ITEMS.obClientDbData.menuitems[entityCode].chain : false)
								});
							}
							break;
						}
					}
				}
			}
		}

		if (result !== null)
		{
			for (var categoryId in result.CATEGORIES)
			{
				if (result.CATEGORIES.hasOwnProperty(categoryId))
				{
					result.CATEGORIES[categoryId].ITEMS.sort(_this.resultCmp);
				}
			}
		}

		return result;
	};

	this.resultCmp = function(a, b)
	{
		if (
			typeof a.TYPE != 'undefined'
			&& typeof b.TYPE != 'undefined'
			&& a.TYPE == 'sonetgroups'
			&& b.TYPE == 'sonetgroups'
			&& typeof a.IS_MEMBER != 'undefined'
			&& typeof b.IS_MEMBER != 'undefined'
		)
		{
			if (a.IS_MEMBER == b.IS_MEMBER)
			{
				if (a.NAME == b.NAME)
				{
					return 0;
				}

				return (a.NAME < b.NAME ? -1 : 1);
			}

			return (a.IS_MEMBER > b.IS_MEMBER ? -1 : 1);
		}
		else
		{
			if (a.NAME == b.NAME)
			{
				return 0;
			}

			return (a.NAME < b.NAME ? -1 : 1);
		}
	};

	this.BuildResult = function(jsonResult, showWaiter)
	{
		var rows = [];
		var category = null;
		var itemBlock = null;
		var blockClassName = "";
		var resultEmpty = true;

		if (
			typeof jsonResult === "object"
			&& jsonResult
			&& typeof jsonResult.CATEGORIES != 'undefined'
			&& BX.type.isNotEmptyObject(jsonResult.CATEGORIES)
		)
		{
			for (var categoryId in jsonResult.CATEGORIES)
			{
				if (categoryId == "all")
					continue;

				if (jsonResult.CATEGORIES.hasOwnProperty(categoryId))
				{
					if (resultEmpty)
					{
						resultEmpty = false;
					}
					category = jsonResult.CATEGORIES[categoryId];

					if (typeof category.ITEMS != 'undefined')
					{
						var i = 0;
						var isMoreItems = false;
						var itemBlocks = [];

						for (var itemId in category.ITEMS)
						{
							if (category.ITEMS.hasOwnProperty(itemId))
							{
								if (i >= 7)
								{
									isMoreItems = true;
									break;
								}

								var currentItem = category.ITEMS[itemId];

								if (currentItem.TYPE == "all")
									continue;

								if (currentItem.TYPE == "users" || currentItem.TYPE == "sonetgroups")
								{
									blockClassName = 'search-title-top-block-' + currentItem.TYPE;
								}
								else
								{
									blockClassName = 'search-title-top-block-section';
								}

								itemBlock = this.BuildResultItem(currentItem);

								itemBlocks.push(itemBlock);
								i++;
							}
						}
						if (itemBlocks && currentItem)
						{
							rows.push(BX.create('div', {
								attrs: {"className": "search-title-top-block " + blockClassName},
								children: [
									BX.create('div', {
										props: {
											className: 'search-title-top-subtitle'
										},
										children: [
											BX.create("div", {
												props: {className: 'search-title-top-subtitle-text'},
												html: category.TITLE
											})
										]
									}),
									BX.create('div', {
										props: {
											className: 'search-title-top-list-wrap'
										},
										children: [
											BX.create("div", {
												attrs: {
													className: "search-title-top-list search-title-top-list-js",
													"bx-search-block-id" : currentItem.TYPE
												},
												children: itemBlocks
											})
										]
									})
								]
							}));

							//more items are in a separated block for selecting by keys
							if (
								isMoreItems
								&& (currentItem.TYPE == "users" || currentItem.TYPE == "sonetgroups")
							)
							{
								if (currentItem.TYPE == "users")
								{
									var url = this.arParams.MORE_USERS_URL + this.INPUT.value;
								}
								else if (currentItem.TYPE == "sonetgroups")
								{
									url = this.arParams.MORE_GROUPS_URL + this.INPUT.value
								}

								var moreItem = {
									"URL": url,
									"ITEM_ID" : currentItem.TYPE + "_more"
								};
								var moreBlock = this.BuildMoreBlock(moreItem);
								rows.push(moreBlock);
							}
						}
					}
				}
			}
		}

		//if (showWaiter)
		//{
		rows.push(BX.create('div', {
			attrs: {
				style: "margin-bottom: 20px;" + (!showWaiter ? "display:none;" : ""),
				id : "title-search-waiter"
			},
			children: [
				BX.create('div', {
					props: {
						className: 'title-search-waiter'
					},
					children: [
						BX.create('span', {
							props: {
								className: 'title-search-waiter-img'
							}
						}),
						BX.create('span', {
							props: {
								className: 'title-search-waiter-text'
							},
							html: _this.arParams.WAITER_TEXT
						})
					]
				})
			]
		}));
		//}


		rows = this.BuildGlobalSearchCategories(rows);

		var result = BX.create('div', {
			props: {
				className: 'search-title-top-result'
			},
			children: rows
		});

		return result;
	};

	this.BuildResultItem = function (currentItem)
	{
		if (!(typeof currentItem == "object" && currentItem))
			return;

		if (this.selectedItemDataId == null)
		{
			this.selectedItemDataId = currentItem.ITEM_ID;
		}

		var itemBlock = BX.create("div", {
			attrs: {
				className: "search-title-top-item search-title-top-item-js" + (this.selectedItemDataId == currentItem.ITEM_ID ? " search-title-top-item-selected" : ""),
				title: (typeof currentItem.CHAIN != 'undefined' && BX.type.isArray(currentItem.CHAIN) ? currentItem.CHAIN.join(' -> ') : ''),
				'bx-search-item-id': currentItem.ITEM_ID
			},
			children: [
				BX.create('a', {
					attrs: {
						href: currentItem.URL,
						className: "search-title-top-item-link"
					},
					children: [
						currentItem.TYPE == "users" || currentItem.TYPE == "sonetgroups" ?
							BX.create('span', {
								attrs: {
									style: (typeof currentItem.ICON != 'undefined' && currentItem.ICON.length > 0 ? "background-image: url('" + currentItem.ICON + "')" : '')
								},
								props: {
									className: 'search-title-top-item-img' + (!currentItem.ICON ? " search-title-top-item-img-default-" + currentItem.TYPE : "")// + currentItem.TYPE
								}
							}) : "",
						BX.create('span', {
							props: {
								className: 'search-title-top-item-text'
							},
							children: [
								BX.create("span", {
									html: currentItem.NAME
								})
							]
						})
					]
				}),
				currentItem.TYPE == "users" ?
					BX.create("span", {
						attrs: { className: "search-title-top-item-message"},
						events: {
							"click" : BX.proxy(function ()
							{
								if (BX.IM)
								{
									BXIM.openMessenger(this.userId);
								}
								else
								{
									window.open('', '', 'status=no,scrollbars=yes,resizable=yes,width=700,height=550,top='+Math.floor((screen.height - 550)/2-14)+',left='+Math.floor((screen.width - 700)/2-5)); return false;
								}
							}, {userId: currentItem.ITEM_ID.substring(1)})
						}
					}) : ""
			],
			events: {
				"mouseover" : BX.proxy(function () {
					this.UnSelectAll();
					this.SelectItem(BX.proxy_context);
				}, this),
				"mouseout" : BX.proxy(function () {
					this.UnSelectItem(BX.proxy_context);
					this.selectedItemDataId = null;
				}, this)
			}
		});

		return itemBlock;
	};

	this.BuildMoreBlock = function (item)
	{
		var block = BX.create('div', {
			attrs: {
				"className": "search-title-top-block search-title-top-more-block",
				"style": "margin-top: -35px;"
			},
			children: [
				BX.create('div', {
					props: {
						className: 'search-title-top-list-wrap'
					},
					children: [
						BX.create("div", {
							attrs: {
								className: "search-title-top-list search-title-top-list-js"
							},
							children: [
								BX.create("div", {
									attrs: {
										className: "search-title-top-more search-title-top-item-js",
										"bx-search-item-id" : item.ITEM_ID
									},
									children: [
										BX.create("a", {
											attrs: {
												className: "search-title-top-more-text",
												href: item.URL
											},
											html: BX.message("SEARCH_MORE")
										})
									]
								})
							]
						})
					]
				})
			]
		});

		return block;
	};

	this.BuildGlobalSearchCategories = function(rows)
	{
		//global search category
		var itemBlocks = [];

		for (var i in this.arParams.GLOBAL_SEARCH_CATEGORIES)
		{
			if (!this.arParams.GLOBAL_SEARCH_CATEGORIES.hasOwnProperty(i))
				continue;

			var limited = this.arParams.GLOBAL_SEARCH_CATEGORIES[i].limited === true;
			var item = {
				"NAME": this.arParams.GLOBAL_SEARCH_CATEGORIES[i].text,
				"URL": this.arParams.GLOBAL_SEARCH_CATEGORIES[i].url + (limited ? "" : this.INPUT.value),
				"ITEM_ID" : i
			};

			var itemBlock = this.BuildResultItem(item);
			itemBlocks.push(itemBlock);
		}
		//Отключаем "искать "
		var block = BX.create('div', {
			attrs: {"className": "search-title-top-block search-title-top-block-tools", id: "search-title-block-tools"},
			style:{"display":"none"},
			children: [
				BX.create('div', {
					props: {
						className: 'search-title-top-subtitle'
					},
					children: [
						BX.create("div", {
							props: {className: 'search-title-top-subtitle-text'},
							html: BX.message("GLOBAL_SEARCH")
						})
					]
				}),
				BX.create('div', {
					attrs: { className: "search-title-top-list-height-wrap", id: "search-title-global-categories-height-wrap" },
					children: [
						BX.create('div', {
							attrs: {
								className: 'search-title-top-list-wrap', id: 'search-title-global-categories-wrap'
							},
							children: [
								BX.create("div", {
									attrs: {
										className: "search-title-top-list search-title-top-list-js"
									},
									children: itemBlocks
								}),
								BX.create("div", {
									attrs: {className: "search-title-top-arrow"}
								})
							]
						})
					]
				})
			]
		});


		rows.push(block);
		//this.toggleGlobalCategories("open");

		return rows;
	};

	this.BuildEntities = function (result)
	{
		var crmContact = [];
		var crmCompany= [];
		var crmDeal= [];
		var crmLead= [];
		var crmQuote= [];
		var crmInvoice= [];
		var crmDynamic = [];
		var diskItems= [];
		var taskItems= [];
		var crmContactMore = false, crmCompanyMore = false, crmDealMore = false, crmLeadMore = false,
			crmInvoiceMore = false, crmQuoteMore = false, diskMore = false, taskMore = false;

		var itemsData = result && result.data && BX.type.isArray(result.data.items) ? result.data.items : [];
		for (var i = 0; i < itemsData.length; i++)
		{
			var itemData = result.data.items[i];

			var item = {
				"NAME": BX.util.htmlspecialchars(itemData.title),
				"URL": itemData.links.show,
				"ITEM_ID" : itemData.type + itemData.id
			};

			if (itemData.type === "CONTACT")
			{
				if (crmContact.length < 10)
				{
					crmContact.push(item);
				}
				else
				{
					crmContactMore = true;
				}
			}
			/*else if (itemData.type === "COMPANY")
			{
				if (crmCompany.length < 10)
				{
					crmCompany.push(item);
				}
				else
				{
					crmCompanyMore = true;
				}
			}
			else if (itemData.type === "DEAL")
			{
				if (crmDeal.length < 10)
				{
					crmDeal.push(item);
				}
				else
				{
					crmDealMore = true;
				}

			}
			else if (itemData.type === "LEAD")
			{
				if (crmLead.length < 10)
				{
					crmLead.push(item);
				}
				else
				{
					crmLeadMore = true;
				}
			}
			else if (itemData.type === "QUOTE")
			{
				if (crmQuote.length < 10)
				{
					crmQuote.push(item);
				}
				else
				{
					crmQuoteMore = true;
				}
			}
			else if (itemData.type === "INVOICE")
			{
				if (crmInvoice.length < 10)
				{
					crmInvoice.push(item);
				}
				else
				{
					crmInvoiceMore = true;
				}
			}
			else if (itemData.module === 'crm' && itemData.type.indexOf('DYNAMIC_') === 0)
			{
				if (crmDynamic.length < 10)
				{
					crmDynamic.push(item);
				}
			}
			else if (itemData.module === "disk")
			{
				if (diskItems.length < 10)
				{
					diskItems.push(item);
				}
				else
				{
					diskMore = true;
				}
			}
			else if (itemData.type === "TASK")
			{
				if (taskItems.length < 10)
				{
					taskItems.push(item);
				}
				else
				{
					taskMore = true;
				}

			}*/
		}

		var limits = {};
		if (result && result.data && BX.type.isArray(result.data.limits))
		{
			result.data.limits.forEach(function(limit) {

				if (!BX.type.isPlainObject(limit))
				{
					return;
				}

				if (BX.type.isNotEmptyString(limit.type))
				{
					limits[limit.type.toLowerCase()] = limit;
				}
				else if (BX.type.isNotEmptyString(limit.module))
				{
					limits[limit.module.toLowerCase()] = limit;
				}
			});
		}

		this.BuildEntityBlock(crmDeal, "CRM: " + BX.message("SEARCH_CRM_DEAL"), "deal", limits.deal);
		if (crmDealMore)
		{
			console.log("crmDealMore="+crmDealMore)
			item = {
				"URL": this.arParams.GLOBAL_SEARCH_CATEGORIES["deal"]["url"] + this.INPUT.value,
				"ITEM_ID": "deal_more"
			};
			var moreBlock = this.BuildMoreBlock(item);
			BX.firstChild(_this.RESULT).insertBefore(moreBlock, BX("search-title-block-tools"));
		}
		this.BuildEntityBlock(crmContact, "CRM: " + BX.message("SEARCH_CRM_CONTACT"), "contact", limits.contact);
		if (crmContactMore)
		{
			item = {
				"URL": this.arParams.GLOBAL_SEARCH_CATEGORIES["contact"]["url"] + this.INPUT.value,
				"ITEM_ID": "contact_more"
			};
			var moreBlock = this.BuildMoreBlock(item);
			BX.firstChild(_this.RESULT).insertBefore(moreBlock, BX("search-title-block-tools"));
		}

		this.BuildEntityBlock(crmCompany, "CRM: " + BX.message("SEARCH_CRM_COMPANY"), "company", limits.company);
		if (crmCompanyMore)
		{
			item = {
				"URL": this.arParams.GLOBAL_SEARCH_CATEGORIES["company"]["url"] + this.INPUT.value,
				"ITEM_ID": "company_more"
			};
			var moreBlock = this.BuildMoreBlock(item);
			BX.firstChild(_this.RESULT).insertBefore(moreBlock, BX("search-title-block-tools"));
		}

		this.BuildEntityBlock(crmLead, "CRM: " + BX.message("SEARCH_CRM_LEAD"), "lead", limits.lead);
		if (crmLeadMore)
		{
			item = {
				"URL": this.arParams.GLOBAL_SEARCH_CATEGORIES["lead"]["url"] + this.INPUT.value,
				"ITEM_ID": "lead_more"
			};
			var moreBlock = this.BuildMoreBlock(item);
			BX.firstChild(_this.RESULT).insertBefore(moreBlock, BX("search-title-block-tools"));
		}

		this.BuildEntityBlock(crmInvoice, "CRM: " + BX.message("SEARCH_CRM_INVOICE"), "invoice", limits.invoice);
		if (crmInvoiceMore)
		{
			item = {
				"URL": this.arParams.GLOBAL_SEARCH_CATEGORIES["invoice"]["url"] + this.INPUT.value,
				"ITEM_ID": "invoice_more"
			};
			var moreBlock = this.BuildMoreBlock(item);
			BX.firstChild(_this.RESULT).insertBefore(moreBlock, BX("search-title-block-tools"));
		}

		this.BuildEntityBlock(crmQuote, "CRM: " + BX.message("SEARCH_CRM_QUOTE"), "quote", limits.quote);
		if (crmQuoteMore)
		{
			item = {
				"URL": this.arParams.GLOBAL_SEARCH_CATEGORIES["quote"]["url"] + this.INPUT.value,
				"ITEM_ID": "quote_more"
			};
			var moreBlock = this.BuildMoreBlock(item);
			BX.firstChild(_this.RESULT).insertBefore(moreBlock, BX("search-title-block-tools"));
		}

		this.BuildEntityBlock(crmDynamic, "CRM: " + BX.message("SEARCH_CRM_DYNAMIC"), "dynamic");

		this.BuildEntityBlock(diskItems, BX.message("SEARCH_DISK"), "disk", limits.disk);
		if (diskMore)
		{
			item = {
				"URL": this.arParams.GLOBAL_SEARCH_CATEGORIES["disk"]["url"] + this.INPUT.value,
				"ITEM_ID": "disk_more"
			};
			var moreBlock = this.BuildMoreBlock(item);
			BX.firstChild(_this.RESULT).insertBefore(moreBlock, BX("search-title-block-tools"));
		}

		this.BuildEntityBlock(taskItems, BX.message("SEARCH_TASKS"), "task", limits.task);
		if (taskMore)
		{
			item = {
				"URL": this.arParams.GLOBAL_SEARCH_CATEGORIES["tasks"]["url"] + this.INPUT.value,
				"ITEM_ID": "task_more"
			};
			var moreBlock = this.BuildMoreBlock(item);
			BX.firstChild(_this.RESULT).insertBefore(moreBlock, BX("search-title-block-tools"));
		}

		BX("title-search-waiter").style.display = "none";
		_this.checkSelectedItem();
	};

	this.BuildEntityBlock = function (items, blockTitle, entityType, limits)
	{
		if (items.length > 0)
		{
			var crmBlocks = [];
			for (var i in items)
			{
				var crmBlock = _this.BuildResultItem(items[i]);
				crmBlocks.push(crmBlock);
			}

			if (crmBlocks)
			{
				this.BuildEntity(crmBlocks, blockTitle, entityType);
			}
		}
		else if (BX.type.isPlainObject(limits))
		{
			this.buildLimits(limits, blockTitle);
		}
	};

	this.BuildEntity = function (crmBlocks, blockTitle, entityType)
	{
		var crmSection = (BX.create('div', {
			attrs: {"className": "search-title-top-block search-title-top-block-section"},
			style:{"display":"none"},
			children: [
				BX.create('div', {
					props: {
						className: 'search-title-top-subtitle'
					},
					children: [
						BX.create("div", {
							props: {className: 'search-title-top-subtitle-text'},
							html: blockTitle
						})
					]
				}),
				BX.create('div', {
					props: {
						className: 'search-title-top-list-wrap'
					},
					children: [
						BX.create("div", {
							attrs: {
								className: "search-title-top-list search-title-top-list-js",
								"bx-search-block-id" : entityType
							},
							children: crmBlocks
						})
					]
				})
			]
		}));

		BX.firstChild(_this.RESULT).insertBefore(crmSection, BX("search-title-block-tools"));
	};

	this.buildLimits = function(limits, blockTitle)
	{
		var limitsSection = BX.create('div', {
			attrs: {
				"className": "search-title-top-block search-title-top-block-section"
			},
			style:{"display":"none"},
			html:
				'<div class="search-title-top-subtitle">' +
				'<div class="search-title-top-subtitle-text">' + blockTitle + '</div>' +
				'</div>' +
				'<div class="search-title-top-list-wrap">' +
				'<div class="search-title-top-list">' +
				'<div class="search-title-top-list-limits">' +
				'<div class="search-title-top-list-limits-block">' +
				'<span class="search-title-top-list-limits-icon"></span>' +
				'</div>' +
				'<div class="search-title-top-list-limits-block">' +
				'<div class="search-title-top-list-limits-name">' +
				(BX.type.isString(limits.title) ? limits.title : '') +
				'</div>' +
				'<div class="search-title-top-list-limits-content">' +
				(BX.type.isString(limits.description) ? limits.description : '') +
				'</div>' +
				(
					BX.type.isArray(limits.buttons) && limits.buttons.length > 0
						?
						'<div class="ui-btn-container ui-btn-container-center">' +
						limits.buttons.join('') +
						'</div>'
						: ''
				) +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>'
		});
		BX.firstChild(_this.RESULT).insertBefore(limitsSection, BX("search-title-block-tools"));
	};

	this.checkSelectedItem = function ()
	{
		var selectedNode = BX.findChild(_this.RESULT, {className: "search-title-top-item-selected"}, true);

		if (BX.type.isDomNode(selectedNode) && BX("search-title-global-categories-wrap").contains(selectedNode))
		{
			var firstNode = BX.findChild(_this.RESULT, {className: "search-title-top-item-js"}, true);
			_this.UnSelectAll();
			_this.SelectItem(firstNode);
		}
	};

	this.ShowResult = function(result, showWaiter, afterAjax)
	{
		_this.CreateResultWrap();
		/* modified */
		var ieTop = 0;
		var ieLeft = -14;
		var ieWidth = 0;
		if(BX.browser.IsIE())
		{
			ieTop = 0;
			ieLeft = -13;
			ieWidth = -1;

			if(/MSIE 7/i.test(navigator.userAgent))
			{
				ieTop = -1;
				ieLeft = -1;
				ieWidth = -2;
			}
		}

		var pos = BX.pos(_this.CONTAINER);
		pos.width = pos.right - pos.left;
		_this.RESULT.style.position = 'absolute';
		_this.RESULT.style.top = pos.bottom + ieTop - 1 + 'px';/* modified */
		_this.RESULT.style.left = pos.left + ieLeft + 'px';/* modified */
		_this.RESULT.style.width = (pos.width + ieWidth) + 'px';/* modified */

		if (typeof _this.arParams.FORMAT != 'undefined' && _this.arParams.FORMAT == 'json')
		{
			result = _this.BuildResult(result, !!showWaiter);
			BX.cleanNode(_this.RESULT);
			if (BX.type.isDomNode(result) && result.innerHTML.length)
			{
				_this.RESULT.appendChild(result);
				if (BX.type.isDomNode(BX("search-title-block-tools")) && BX.type.isDomNode(BX("search-title-global-categories-wrap")))
				{
					BX.bind(BX("search-title-global-categories-wrap"), "mouseover", BX.proxy(function ()
					{
						_this.toggleGlobalCategories("open");
					}, _this));
					BX.bind(BX("search-title-global-categories-wrap"), "mouseout", BX.proxy(function ()
					{
						_this.toggleGlobalCategories("close");
					}, _this));

					_this.RESULT.style.display = 'block';
				}
				else
				{
					_this.RESULT.style.display = 'block';
				}


				if (afterAjax)
				{
					BX("title-search-waiter").style.display = "block";

					if (_this.arParams.IS_CRM_INSTALLED) //search in crm
					{
						var resCrm = BX.ajax.runAction("crm.api.entity.search", { data: { searchQuery: this.INPUT.value, options: { scope: 'index'/*, types: [ BX.CrmEntityType.names.contact ] */} } });
						resCrm.then(this.BuildEntities.bind(this));
					}

					var resDisk = BX.ajax.runAction("disk.commonActions.search", { data: { searchQuery: this.INPUT.value } });
					resDisk.then(this.BuildEntities.bind(this));

					var restTask = BX.ajax.runAction("tasks.task.search", { data: { searchQuery: this.INPUT.value } });
					restTask.then(this.BuildEntities.bind(this));
				}
			}
		}
		else
		{
			_this.RESULT.innerHTML = result;
		}
	};

	this.toggleGlobalCategories = function(mode)
	{
		var wrap = BX("search-title-global-categories-wrap");
		var heightWrap = BX("search-title-global-categories-height-wrap");

		if (!BX.type.isDomNode(wrap) || !BX.type.isDomNode(heightWrap))
			return;

		if (mode == "open")
		{
			BX.addClass(wrap, "search-title-top-list-wrap-hover");
			heightWrap.style.height = wrap.offsetHeight + "px";
		}
		else
		{
			var selectedItem = BX.findChild(wrap, {className: "search-title-top-item-selected"}, true, false);
			if (!selectedItem)
			{
				BX.removeClass(wrap, "search-title-top-list-wrap-hover");
				heightWrap.style.height = "";
			}
		}
	};

	this.SyncResult = function(result, searchString)
	{
		var
			ajaxDbEntities = null,
			ajaxUserCodeList = [],
			ajaxGroupCodeList = [],
			ajaxMenuItemCodeList = [],
			codes = [];

		searchString = searchString.toLowerCase();

		for (var i=0;i<_this.arParams.CATEGORIES_ALL.length;i++)
		{
			if (typeof _this.arParams.CATEGORIES_ALL[i].CODE != 'undefined')
			{
				if (typeof result.CATEGORIES[i] != 'undefined')
				{
					if (_this.arParams.CATEGORIES_ALL[i].CODE == 'custom_menuitems')
					{
						ajaxDbEntities = {};
						for (var j=0;j<result.CATEGORIES[i].ITEMS.length;j++)
						{
							ajaxDbEntities[result.CATEGORIES[i].ITEMS[j].ITEM_ID] = _this.ConvertAjaxToClientDB(result.CATEGORIES[i].ITEMS[j], 'menuitems');
							ajaxMenuItemCodeList.push(result.CATEGORIES[i].ITEMS[j].ITEM_ID);
						}
						BX.onCustomEvent(_this, 'onFinderAjaxSuccess', [ ajaxDbEntities, _this.ITEMS, 'menuitems' ]);
					}
					else if (_this.arParams.CATEGORIES_ALL[i].CODE == 'custom_sonetgroups')
					{
						ajaxDbEntities = {};
						for (j=0;j<result.CATEGORIES[i].ITEMS.length;j++)
						{
							ajaxDbEntities[result.CATEGORIES[i].ITEMS[j].ITEM_ID] = _this.ConvertAjaxToClientDB(result.CATEGORIES[i].ITEMS[j], 'sonetgroups');
							ajaxGroupCodeList.push(result.CATEGORIES[i].ITEMS[j].ITEM_ID);
						}
						BX.onCustomEvent(_this, 'onFinderAjaxSuccess', [ ajaxDbEntities, _this.ITEMS, 'sonetgroups' ]);
					}
					/*
                                        else if (_this.arParams.CATEGORIES_ALL[i].CODE == 'custom_users')
                                        {
                                            ajaxDbEntities = {};
                                            for (j=0;j<result.CATEGORIES[i].ITEMS.length;j++)
                                            {
                                                ajaxDbEntities[result.CATEGORIES[i].ITEMS[j].ITEM_ID] = _this.ConvertAjaxToClientDB(result.CATEGORIES[i].ITEMS[j], 'users');
                                                ajaxUserCodeList.push(result.CATEGORIES[i].ITEMS[j].ITEM_ID);
                                            }
                                            BX.onCustomEvent(_this, 'onFinderAjaxSuccess', [ ajaxDbEntities, _this.ITEMS, 'users' ]);
                                        }
                    */
				}

				var z = 0;

				if (
					_this.arParams.CATEGORIES_ALL[i].CODE == 'custom_users'
					&& BX.type.isNotEmptyString(searchString)
					&& typeof _this.ITEMS.oDbSearchResult[searchString] != 'undefined'
					&& _this.ITEMS.oDbSearchResult[searchString].length > 0
				)
				{
					codes = [];
					for (z=0;z<_this.ITEMS.oDbSearchResult[searchString].length;z++)
					{
						if (_this.ITEMS.oDbSearchResult[searchString][z].match(/U(\d+)/) !== null)
						{
							codes.push(_this.ITEMS.oDbSearchResult[searchString][z]);
						}
					}

					if (codes.length > 0)
					{
						BX.onCustomEvent('syncClientDb', [
							_this.ITEMS,
							false, // name
							codes,
							ajaxUserCodeList,
							'users'
						]);
					}
				}

				if (
					_this.arParams.CATEGORIES_ALL[i].CODE == 'custom_sonetgroups'
					&& BX.type.isNotEmptyString(searchString)
					&& typeof _this.ITEMS.oDbSearchResult[searchString] != 'undefined'
					&& _this.ITEMS.oDbSearchResult[searchString].length > 0
				)
				{
					codes = [];
					for (z=0;z<_this.ITEMS.oDbSearchResult[searchString].length;z++)
					{
						if (_this.ITEMS.oDbSearchResult[searchString][z].match(/G(\d+)/) !== null)
						{
							codes.push(_this.ITEMS.oDbSearchResult[searchString][z]);
						}
					}

					if (codes.length > 0)
					{
						BX.onCustomEvent('syncClientDb', [
							_this.ITEMS,
							false, // name
							codes,
							ajaxGroupCodeList,
							'sonetgroups'
						]);
					}
				}

				if (
					_this.arParams.CATEGORIES_ALL[i].CODE == 'custom_menuitems'
					&& BX.type.isNotEmptyString(searchString)
					&& typeof _this.ITEMS.oDbSearchResult[searchString] != 'undefined'
					&& _this.ITEMS.oDbSearchResult[searchString].length > 0
				)
				{
					codes = [];
					for (z=0;z<_this.ITEMS.oDbSearchResult[searchString].length;z++)
					{
						if (_this.ITEMS.oDbSearchResult[searchString][z].match(/M\/(.+)/) !== null)
						{
							codes.push(_this.ITEMS.oDbSearchResult[searchString][z]);
						}
					}

					if (codes.length > 0)
					{
						BX.onCustomEvent('syncClientDb', [
							_this.ITEMS,
							false, // name
							codes,
							ajaxMenuItemCodeList,
							'menuitems'
						]);
					}
				}
			}
		}
	};

	this.ConvertAjaxToClientDB = function(oEntity, entity)
	{
		var result = null;
		if (entity == 'sonetgroups')
		{
			result = {
				id: 'G' + oEntity.ID,
				entityId: oEntity.ID,
				name: oEntity.NAME,
				avatar: oEntity.ICON,
				desc: '',
				isExtranet: (oEntity.IS_EXTRANET ? 'Y' : 'N'),
				site: oEntity.SITE,
				checksum: oEntity.CHECKSUM,
				isMember: (typeof oEntity.IS_MEMBER != 'undefined' &&  oEntity.IS_MEMBER ? 'Y' : 'N')
			};
		}
		else if (entity == 'menuitems')
		{
			result = {
				id: 'M' + oEntity.URL,
				entityId: oEntity.URL,
				name: oEntity.NAME,
				checksum: oEntity.CHECKSUM,
				chain: (typeof oEntity.CHAIN != 'undefined' && BX.type.isArray(oEntity.CHAIN) ? oEntity.CHAIN : null)
			};
		}
		else if (entity == 'users')
		{
			result = {
				id: 'U' + oEntity.ID,
				entityId: oEntity.ID,
				name: oEntity.NAME,
				login: oEntity.LOGIN,
				active: oEntity.ACTIVE,
				avatar: oEntity.ICON,
				desc: oEntity.DESCRIPTION,
				isExtranet: 'N',
				isEmail: 'N',
				checksum: oEntity.CHECKSUM
			};
		}

		return result;
	};

	this.onKeyPress = function(keyCode)
	{
		_this.CreateResultWrap();
		var popup = BX.findChild(_this.RESULT, {'tag':'div','class':'search-title-top-result'}, true);

		if(!popup)
			return false;

		var blocks = BX.findChildren(_this.RESULT, {"className" : "search-title-top-list-js"}, true);

		switch (keyCode)
		{
			case 27: // escape key - close search div
				_this.RESULT.style.display = 'none';
				break;

			case 40: // down key - navigate down on search results
				if(_this.RESULT.style.display == 'none')
					_this.RESULT.style.display = 'block';

				var items = BX.findChildren(_this.RESULT, {"className" : "search-title-top-item-js"}, true);

				if (this.selectedItemDataId === null)
				{
					_this.SelectItem(items[0]);
				}
				else
				{
					var currentItemNode = _this.RESULT.querySelector("[bx-search-item-id='" + _this.selectedItemDataId + "']");

					if (!BX.type.isDomNode(currentItemNode))
						return false;

					var currentBlockNode = BX.findParent(currentItemNode, {className: "search-title-top-list-js"}, true);

					if (!BX.type.isDomNode(currentBlockNode))
						return false;

					var currentBlockItems = BX.findChildren(currentBlockNode, {className: "search-title-top-item-js"}, true);
					var currentItemOffsetLeft = currentItemNode.offsetLeft;
					var currentItemOffsetTop = currentItemNode.offsetTop;
					var currentItemWidth = currentItemNode.offsetWidth;
					var currentItemOffsetRight = currentItemOffsetLeft + currentItemWidth;
					var rowItems = [];
					var nextTopOffset = null;

					for (var i in currentBlockItems)
					{
						if (currentBlockItems[i].offsetTop <= currentItemOffsetTop)
						{
							continue;
						}
						else
						{
							if (nextTopOffset === null)
								nextTopOffset = currentBlockItems[i].offsetTop;
						}

						if (nextTopOffset && currentBlockItems[i].offsetTop == nextTopOffset)
						{
							rowItems.push(currentBlockItems[i]);
						}
					}

					if (rowItems.length > 0)
					{
						_this.UnSelectAll();

						for (i in rowItems)
						{
							if (rowItems[i].offsetLeft + rowItems[i].offsetWidth > currentItemOffsetLeft)
							{
								var nextItem = rowItems[Number(i) + 1];
								//finding an appropriate down element
								if (
									nextItem
									&& nextItem.offsetLeft <= currentItemOffsetRight
								)
								{
									var leftItemDiff = rowItems[i].offsetLeft + rowItems[i].offsetWidth - currentItemOffsetLeft;
									var rightItemDiff = currentItemOffsetRight - nextItem.offsetLeft;

									if (rightItemDiff > leftItemDiff)
									{
										_this.SelectItem(nextItem);

										return true;
									}
								}

								_this.SelectItem(rowItems[i]);
								return true;
							}
						}

						//select last item in the row
						_this.SelectItem(rowItems[rowItems.length - 1]);
						return true;
					}
					else
					{
						for (var i in blocks)
						{
							if (blocks[i] == currentBlockNode)
							{
								//current selected item is the last item in the block, go to the next block
								if (blocks[Number(i) + 1])
								{
									_this.UnSelectAll();
									var item = BX.firstChild(blocks[Number(i) + 1], {className: "search-title-top-item-js"}, true);
									if (BX.type.isDomNode(item))
									{
										_this.SelectItem(item);
									}

									return true;
								}
							}
						}
					}
				}

				return true;

			case 38: // up key - navigate up on search results
				if(_this.RESULT.style.display == 'none')
					_this.RESULT.style.display = 'block';

				if (this.selectedItemDataId !== null)
				{
					currentItemNode = _this.RESULT.querySelector("[bx-search-item-id='" + _this.selectedItemDataId + "']");

					if (!BX.type.isDomNode(currentItemNode))
						return false;

					currentBlockNode = BX.findParent(currentItemNode, {className: "search-title-top-list-js"}, true);

					if (!BX.type.isDomNode(currentBlockNode))
						return false;

					currentBlockItems = BX.findChildren(currentBlockNode, {className: "search-title-top-item-js"}, true);
					currentItemOffsetLeft = currentItemNode.offsetLeft;
					currentItemOffsetTop = currentItemNode.offsetTop;
					currentItemWidth = currentItemNode.offsetWidth;
					currentItemOffsetRight = currentItemOffsetLeft + currentItemWidth;
					rowItems = [];
					nextTopOffset = null;

					currentBlockItems = currentBlockItems.reverse();

					for (i in currentBlockItems)
					{
						if (currentBlockItems[i].offsetTop >= currentItemOffsetTop)
						{
							continue;
						}
						else
						{
							if (nextTopOffset === null)
								nextTopOffset = currentBlockItems[i].offsetTop;
						}

						if (nextTopOffset && currentBlockItems[i].offsetTop == nextTopOffset)
						{
							rowItems.push(currentBlockItems[i]);
						}
					}

					rowItems = rowItems.reverse();

					if (rowItems.length > 0)
					{
						_this.UnSelectAll();

						for (i in rowItems)
						{
							if (rowItems[i].offsetLeft + rowItems[i].offsetWidth > currentItemOffsetLeft)
							{
								nextItem = rowItems[Number(i) + 1];
								//finding an appropriate down element
								if (
									nextItem
									&& nextItem.offsetLeft <= currentItemOffsetRight
								)
								{
									leftItemDiff = rowItems[i].offsetLeft + rowItems[i].offsetWidth - currentItemOffsetLeft;
									rightItemDiff = currentItemOffsetRight - nextItem.offsetLeft;

									if (rightItemDiff > leftItemDiff)
									{
										_this.SelectItem(nextItem);

										return true;
									}
								}

								_this.SelectItem(rowItems[i]);
								return true;
							}
						}

						//select last item in the row
						_this.SelectItem(rowItems[rowItems.length - 1]);
						return true;
					}
					else
					{
						//current selected item is the last item in the block, go to the next block
						for (var i in blocks)
						{
							if (blocks[i] == currentBlockNode)
							{
								if (blocks[Number(i) - 1])
								{
									_this.UnSelectAll();
									item = BX.firstChild(blocks[Number(i) - 1], {className: "search-title-top-item-js"}, true);
									if (BX.type.isDomNode(item))
									{
										_this.SelectItem(item);
									}
								}
							}
						}
					}
				}

				return true;

			case 39: // right key - navigate right on search results
				if (this.selectedItemDataId !== null)
				{
					currentItemNode = _this.RESULT.querySelector("[bx-search-item-id='" + _this.selectedItemDataId + "']");

					if (!BX.type.isDomNode(currentItemNode))
						return false;

					currentBlockNode = BX.findParent(currentItemNode, {className: "search-title-top-list-js"}, true);

					if (!BX.type.isDomNode(currentBlockNode))
						return false;

					currentBlockItems = BX.findChildren(currentBlockNode, {className: "search-title-top-item-js"}, true);
					currentItemOffsetLeft = currentItemNode.offsetLeft;
					currentItemOffsetTop = currentItemNode.offsetTop;

					for (i in currentBlockItems)
					{
						if (currentBlockItems[i].offsetTop != currentItemOffsetTop)
							continue;

						if (currentBlockItems[i].offsetLeft > currentItemOffsetLeft)
						{
							_this.UnSelectAll();
							_this.SelectItem(currentBlockItems[i]);

							return true;
						}
					}
				}

				return true;

			case 37: // left key - navigate left on search results
				if (this.selectedItemDataId !== null)
				{
					currentItemNode = _this.RESULT.querySelector("[bx-search-item-id='" + _this.selectedItemDataId + "']");

					if (!BX.type.isDomNode(currentItemNode))
						return false;

					currentBlockNode = BX.findParent(currentItemNode, {className: "search-title-top-list-js"}, true);

					if (!BX.type.isDomNode(currentBlockNode))
						return false;

					currentBlockItems = BX.findChildren(currentBlockNode, {className: "search-title-top-item-js"}, true);
					if (currentBlockItems)
					{
						currentBlockItems = currentBlockItems.reverse();
					}

					currentItemOffsetLeft = currentItemNode.offsetLeft;
					currentItemOffsetTop = currentItemNode.offsetTop;

					for (i in currentBlockItems)
					{
						if (currentBlockItems[i].offsetTop != currentItemOffsetTop)
							continue;

						if (currentBlockItems[i].offsetLeft < currentItemOffsetLeft)
						{
							_this.UnSelectAll();
							_this.SelectItem(currentBlockItems[i]);
							return true;
						}
					}
				}

				return true;

			case 13: // enter key - choose current search result
				if(_this.RESULT.style.display == 'block' && this.selectedItemDataId !== null)
				{
					currentItemNode = _this.RESULT.querySelector("[bx-search-item-id='" + _this.selectedItemDataId + "']");

					if (BX.type.isDomNode(currentItemNode))
					{
						var a = BX.findChild(currentItemNode, {'tag':'a'}, true);
						BX.fireEvent(a, "click");
					}
				}
				return false;
		}

		return false;
	};

	this.UnSelectAll = function()
	{
		var items = BX.findChildren(_this.RESULT, {"className" : "search-title-top-item-selected"}, true);
		for(var i = 0; i < items.length; i++)
		{
			_this.UnSelectItem(items[i]);
		}
	};

	this.SelectItem = function(element)
	{
		if (!BX.type.isDomNode(element))
			return;

		BX.addClass(element, "search-title-top-item-selected");
		_this.selectedItemDataId = element.getAttribute("bx-search-item-id");

		//check for toggle block
		var isGlobalSearchBlock = BX.findParent(element, {className: "search-title-top-block-tools"}, true);
		if (BX.type.isDomNode(isGlobalSearchBlock))
		{
			_this.toggleGlobalCategories("open");
		}
	};

	this.UnSelectItem = function(element)
	{
		if (!BX.type.isDomNode(element))
			return;

		BX.removeClass(element, "search-title-top-item-selected");

		//check for toggle block
		var isGlobalSearchBlock = BX.findParent(element, {className: "search-title-top-block-tools"}, true);
		if (BX.type.isDomNode(isGlobalSearchBlock))
		{
			_this.toggleGlobalCategories("close");
		}
	};

	/*this.onFocusLost = function()
	{
		if (_this.RESULT != null)
		{
			setTimeout(function() {
				if (!BX.SidePanel.Instance.isOpen())
				{
					_this.RESULT.style.display = 'none';
				}
			}, 250);
		}
	};*/

	this.onFocusGain = function()
	{
		if(_this.RESULT && _this.RESULT.innerHTML.length)
		{
			_this.RESULT.style.display = 'block';
		}

		BX.onCustomEvent(this, "Intranet.Search.Title:onFocusAction", ["gain"]);
	};

	this.onFocusLost = function()
	{
		BX.onCustomEvent(this, "Intranet.Search.Title:onFocusAction", ["lost"]);
	};

	this.onKeyUp = function(event)
	{
		if (!_this.searchStarted)
		{
			return false;
		}

		event = event || window.event;

		if(
			event.keyCode == 37
			|| event.keyCode == 38
			|| event.keyCode == 39
			|| event.keyCode == 40
		)
			return;

		var text = BX.util.trim(_this.INPUT.value);

		if (
			text.length >= 1
			&& (
				text == _this.oldValue
				|| text == _this.oldClientValue
				|| text == _this.startText
			)
			&& !(
				text == _this.oldValue
				&& text != _this.oldClientValue
				&& _this.oldValue.length == _this.arParams.MIN_QUERY_LEN
				&& _this.oldClientValue.length == (_this.arParams.MIN_QUERY_LEN - 1)
			) // fix http://jabber.bx/view.php?id=96016
		)
		{
			return;
		}

		if (_this.xhr)
		{
			_this.xhr.abort();
		}

		if (text.length >= 1)
		{
			BX.removeClass(_this.CONTAINER.parentNode.parentNode, "header-search-empty");
			BX.addClass(_this.CONTAINER.parentNode.parentNode, "header-search-not-empty");

			_this.selectedItemDataId = null;

			_this.cache_key = _this.arParams.INPUT_ID + '|' + text;

			if (_this.cache[_this.cache_key] == null)
			{
				_this.blockAjax = false;

				var arSearchStringAlternatives = [ text ];
				_this.oldClientValue = text;

				var obSearch = { searchString: text };

				BX.onCustomEvent('findEntityByName', [
					_this.ITEMS,
					obSearch,
					{ },
					_this.ITEMS.oDbSearchResult
				]); // get result from the clientDb

				if (obSearch.searchString != text) // if text was converted to another charset
				{
					arSearchStringAlternatives.push(obSearch.searchString);
				}

				var result = _this.MakeResultFromClientDB(arSearchStringAlternatives, text);

				_this.searchByAjax = false;
				_this.ShowResult(result, (text.length >= _this.arParams.MIN_QUERY_LEN));

				if (text.length >= _this.arParams.MIN_QUERY_LEN)
				{
					_this.SendAjax(text);
				}
			}
			else
			{
				_this.blockAjax = true;
				_this.oldClientValue = text;
				_this.ShowResult(_this.cache[_this.cache_key], true, true);
			}
		}
		else
		{
			BX.addClass(_this.CONTAINER.parentNode.parentNode, "header-search-empty");
			BX.removeClass(_this.CONTAINER.parentNode.parentNode, "header-search-not-empty");

			if (_this.RESULT)
			{
				_this.RESULT.style.display = 'none';
			}
		}
	};

	this.SendAjax = BX.debounce(function(text)
	{
		if (_this.blockAjax)
		{
			return;
		}
		_this.oldValue = text;

		_this.xhr = BX.ajax({
			method: 'POST',
			dataType: _this.arParams.FORMAT,
			url: _this.arParams.AJAX_PAGE,
			data:  {
				'ajax_call':'y',
				'INPUT_ID':_this.arParams.INPUT_ID,
				'FORMAT':_this.arParams.FORMAT,
				'q':text
			},
			preparePost: true,
			onsuccess: function(result)
			{
				if (
					typeof result != 'undefined'
					&& result
					&& result.CATEGORIES != 'undefined'
				)
				{
					for (var categoryId in result.CATEGORIES)
					{
						if (result.CATEGORIES.hasOwnProperty(categoryId))
						{
							result.CATEGORIES[categoryId].ITEMS.sort(_this.resultCmp);
						}
					}

					_this.cache[_this.cache_key] = result;
					_this.searchByAjax = true;
					_this.ShowResult(result, false, true);
					_this.SyncResult(result, text);
				}
			}
		});
	}, 1000);

	this.onWindowResize = function()
	{
		if (_this.RESULT != null)
		{
			_this.ShowResult();
		}
	};

	this.onKeyDown = function(event)
	{
		event = event || window.event;

		_this.searchStarted = !(
			event.keyCode == 27
			|| event.keyCode == 40
			|| event.keyCode == 38
			|| event.keyCode == 13
		);

		if (_this.RESULT && _this.RESULT.style.display == 'block')
		{
			if(_this.onKeyPress(event.keyCode))
			{
				return BX.PreventDefault(event);
			}
		}
	};

	this.Init = function()
	{
		this.CONTAINER = BX(this.arParams.CONTAINER_ID);
		this.INPUT = BX(this.arParams.INPUT_ID);
		this.startText = this.oldValue = this.INPUT.value;

		BX.bind(this.INPUT, "focus", BX.proxy(this.onFocusGain, this));
		//BX.bind(window, "resize", BX.proxy(this.onWindowResize, this));
		BX.bind(this.INPUT, "blur", BX.proxy(this.onFocusLost, this));
		this.INPUT.onkeydown = this.onKeyDown;

		BX.Finder(false, 'searchTitle', [], {}, _this);
		BX.onCustomEvent(_this, 'initFinderDb', [ this.ITEMS, 'searchTitle', null, ['users', 'sonetgroups', 'menuitems'], _this ]);
		setTimeout(function() {
			_this.CheckOldStorage(_this.ITEMS.obClientDbData);
		}, 5000);
		if (!this.ITEMS.bLoadAllInitialized)
		{
			BX.addCustomEvent('loadAllFinderDb', BX.delegate(function(params) {
				this.ItemsLoadAll(params);
			}, this));
			this.ITEMS.bLoadAllInitialized = true;
		}

		var closeIcon = BX.findChild(this.CONTAINER, {className: "search-title-top-delete"}, true);
		if (BX.type.isDomNode(closeIcon))
		{
			BX.bind(closeIcon, "click", BX.proxy(function (event)
			{
				this.INPUT.value = "";
				this.onKeyUp();
			}, this));
		}

		BX.bind(this.INPUT, "input", BX.proxy(function (event)
		{
			this.onKeyDown(event);
			this.onKeyUp(event);

			var loupeIcon = BX.findChild(this.CONTAINER, {className: "header-search-icon"}, true);
			if (BX.type.isDomNode(closeIcon))
			{
				loupeIcon.style.display = this.INPUT.value != "" ? "none" : "block";
			}

		}, this));

		BX.bind(document, "click", BX.proxy(this.checkAutoHide, this));
	};

	this.checkAutoHide = function(event)
	{
		if (
			_this.RESULT
			&& !_this.RESULT.contains(event.target)
			&& !document.forms["search-form"].contains(event.target)
		)
		{
			setTimeout(function() {
				_this.RESULT.style.display = 'none';
			}, 250);
		}
	};

	this.CheckOldStorage = function(obClientDbData)
	{
		if (!_this.ITEMS.obClientDb)
		{
			return;
		}

		var firstItem = null;
		var delta = 60*60*24*30; // 30 days
		var bNeedToClear = null;

		for (var key in obClientDbData)
		{
			if (obClientDbData.hasOwnProperty(key))
			{
				if (
					key == 'sonetgroups'
					|| key == 'menuitems'
				)
				{
					bNeedToClear = false;
					for (var code in obClientDbData[key])
					{
						if (obClientDbData[key].hasOwnProperty(code))
						{
							// first item
							firstItem = obClientDbData[key][code];
							if (
								typeof firstItem.timestamp != 'undefined'
								&& parseInt(firstItem.timestamp) > 0
								&& _this.arParams.CURRENT_TS > (parseInt(firstItem.timestamp) + delta)
							)
							{
								bNeedToClear = true;
							}
							break;
						}
					}
					if (bNeedToClear)
					{
						BX.Finder.clearEntityDb(_this.ITEMS.obClientDb, key);
					}
				}
			}
		}
	};

	this.ItemsLoadAll = function(params)
	{
		if (
			typeof params.entity != 'undefined'
			&& typeof this.ITEMS.initialized[params.entity] != 'undefined'
			&& !this.ITEMS.initialized[params.entity]
			&& typeof params.callback == 'function'
		)
		{
			if (
				params.entity == 'sonetgroups'
				|| params.entity == 'menuitems'
			)
			{
				BX.ajax.runAction('intranet.searchentity.getall', {
					data: {
						entity: params.entity
					},
				}).then(function(response) {
					if (typeof response.data.items != 'undefined')
					{
						BX.onCustomEvent('onFinderAjaxLoadAll', [ response.data.items, this.ITEMS, params.entity ]);
						params.callback();
					}
				}.bind(this), function (response) {
				});
			}

			this.ITEMS.initialized[params.entity] = true;
		}
	};

	BX.ready(function (){_this.Init(arParams);});
};
/* End */
;
; /* Start:"a:4:{s:4:"full";s:87:"/bitrix/templates/betboom/components/ndx/change.theme/template1/script.js?1702988602709";s:6:"source";s:73:"/bitrix/templates/betboom/components/ndx/change.theme/template1/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
BX.ready(function(){
    var param1 = ' global Hello';
    BX.bindDelegate(
        document.body, 'change', {attribute: {'id':'change_theme_input'}},
        function(e){
            if(!e)
                e = window.event;

            BX.ajax.runComponentAction('ndx:change.theme', 'change', {
                mode: 'ajax',
                data : {
                    change: e.target.checked
                },
            }).then(function (response) {

                if(response.data && response.status=="success")
                {
                    window.location.reload();
                }

            });

            return BX.PreventDefault(e);
        }
    );
});
/* End */
;
; /* Start:"a:4:{s:4:"full";s:91:"/bitrix/components/bitrix/tasks.iframe.popup/templates/.default/logic.min.js?15961073737131";s:6:"source";s:72:"/bitrix/components/bitrix/tasks.iframe.popup/templates/.default/logic.js";s:3:"min";s:76:"/bitrix/components/bitrix/tasks.iframe.popup/templates/.default/logic.min.js";s:3:"map";s:76:"/bitrix/components/bitrix/tasks.iframe.popup/templates/.default/logic.map.js";}"*/
BX.namespace("Tasks.Component");BX.Tasks.Component.IframePopup=function(t){this.opts=BX.merge({},t);this.vars={skip:true,callbacks:{},resizeInterval:false,resizeLock:true,lastHeight:false};this.sys={scope:null};this.instances={win:false};this.ctrls={iframe:null,wrap:null,close:null};this.setCallbacks(t.callbacks);this.bindEvents()};BX.mergeEx(BX.Tasks.Component.IframePopup.prototype,{add:function(t){this.edit(0,t)},view:function(t){this.open("view",t)},edit:function(t,e){this.open("edit",t,{urlParams:e})},open:function(t,e,n){e=parseInt(e);if(isNaN(e)||e<0){return}n=n||{};var i=this.getPath(t,e,n.urlParams);if(BX.Bitrix24&&"PageSlider"in BX.Bitrix24){BX.Bitrix24.PageSlider.open(i)}else{this.toggleLoading(true);this.getWindow().show();this.getWindow().setBindElement(this.getWindowCoords());this.getWindow().adjustPosition();this.getIframe().src=i}},close:function(){this.getWindow().close()},bindEvents:function(){BX.bind(window,"resize",BX.throttle(this.onWindowResize,100,this));BX.addCustomEvent(window,"tasksIframeLoad",this.onContentLoaded.bind(this));BX.addCustomEvent(window,"tasksIframeUnload",this.onContentUnLoaded.bind(this))},bindInnerDocumentEvents:function(){var t=this.getContentDocument();if(t){BX.bind(t,"keydown",this.onInnerDocumentKeyDown.bind(this))}},getIframe:function(){if(this.ctrls.iframe===null){this.ctrls.iframe=BX.create("iframe",{attrs:{scrolling:"no",frameBorder:"0"}})}return this.ctrls.iframe},getWindow:function(){if(this.instances.win===false){this.instances.win=new BX.PopupWindow("tasks-iframe-popup",{top:0,left:0},{autoHide:false,closeByEsc:true,content:this.getIframeContainer(),overlay:true,lightShadow:false,closeIcon:true,contentNoPaddings:true,draggable:false,titleBar:true,events:{onPopupClose:BX.delegate(this.onPopupClose,this),onPopupShow:BX.delegate(this.onPopupOpen,this)}});this.ctrls.close=BX.create("div",{props:{className:"hidden"},attrs:{id:"tasks-popup-close",title:BX.message("TASKS_TIP_COMPONENT_TEMPLATE_CLOSE_WINDOW")},events:{click:BX.delegate(this.onCloseClicked,this)},children:[BX.create("span")]});BX.insertAfter(this.ctrls.close,BX("popup-window-overlay-tasks-iframe-popup"))}return this.instances.win},setTitle:function(t,e){var n="";if(t!=false){t=t=="view"?"VIEW":"EDIT";e=parseInt(e);if(isNaN(e)||e<=0){e=0}if(t=="EDIT"&&e==0){t="NEW"}n=BX.message("TASKS_TIP_COMPONENT_TEMPLATE_"+t+"_TASK_TITLE");if(e>0){n=n.replace("#TASK_ID#",e)}}this.getWindow().setTitleBar(n)},getPath:function(t,e,n){t=t=="view"?"view":"edit";e=parseInt(e);var i=this.opts.pathToTasks.replace("#task_id#",e);i=i+(i.indexOf("?")==-1?"?":"&")+"IFRAME=Y";if(BX.type.isPlainObject(n)){for(var s in n){i+="&"+s+"="+encodeURIComponent(n[s])}}i=i.replace("#action#",t);return i},getWindowCoords:function(){var t=BX.pos(this.getIframeContainer()).width;var e=BX.GetWindowSize().innerWidth;var n=BX.GetWindowScrollPos().scrollTop;return{left:Math.floor((e-t)/2),top:30+n}},getContentDocument:function(){var t=this.getIframe();var e=null;if(t.contentDocument){e=t.contentDocument}if(t.contentWindow){e=t.contentWindow.document}return e&&e.body?e:null},getIframeContainer:function(){if(this.ctrls.wrap===null){this.ctrls.wrap=this.ctrls.wrap=BX.create("div",{props:{className:"tasks-iframe-wrap loading fixedHeight"},attrs:{id:"tasks-iframe-wrap"},children:[this.getIframe()]})}return this.ctrls.wrap},getContentContainer:function(){var t=this.getContentDocument();if(t){return t.getElementById("tasks-content-outer")}return null},onCloseClicked:function(){this.getWindow().close()},onTaskGlobalEvent:function(t,e){if(BX.type.isNotEmptyString(t)){var n=t.toString().toUpperCase();e=e||{};e.task=e.task||{};e.options=e.options||{};var i=[];var s=parseInt(e.task.ID);if(n=="DELETE"&&!isNaN(s)&&s){i.push(e.task.ID)}else if(n=="ADD"||n=="UPDATE"){if(e.taskUgly){i.push(e.taskUgly)}else{return}}if(!e.options.STAY_AT_PAGE){this.close()}if(typeof this.vars.callbacks[n]!="undefined"&&this.vars.callbacks[n]!==false){var o=this.vars.callbacks[n];if(BX.type.isString(o)){o=BX.Tasks.deReference(o,window)}if(BX.type.isFunction(o)){o.apply(window,i)}}}},onContentLoaded:function(){var t=this.getContentDocument();if(t){var e=this.parseUrl(t.location.pathname);if(e){this.setTitle(e.action,e.taskId)}}this.toggleLoading(false);this.startMonitorContent();this.bindInnerDocumentEvents()},onContentUnLoaded:function(){this.setTitle(false);this.stopMonitorContent()},onPopupOpen:function(){BX.toggleClass(this.ctrls.close,"hidden");this.toggleLoading(true)},onPopupClose:function(){BX.toggleClass(this.ctrls.close,"hidden");this.lockHeight();this.stopMonitorContent();this.toggleLoading(true);this.vars.lastHeight=false;this.getIframe().src="about:blank"},onWindowResize:function(){if(this.getWindow().isShown()){this.getWindow().setBindElement(this.getWindowCoords())}},onContentResize:function(){if(this.getWindow().isShown()&&!this.vars.resizeLock){var t=this.getContentDocument();if(t){var e=this.getContentContainer();if(e){var n=e.offsetHeight;if(n!=this.vars.lastHeight){this.getIframeContainer().style.height=n+"px";this.vars.lastHeight=n;this.unLockHeight()}this.getWindow().popupContainer.style.marginBottom="40px";this.getWindow().resizeOverlay()}}}},onInnerDocumentKeyDown:function(t){if(BX.Tasks.Util.isEsc(t)){this.close()}},lockHeight:function(){this.toggleFixedHeight(true)},unLockHeight:function(){this.toggleFixedHeight(false)},toggleFixedHeight:function(t){BX[t?"addClass":"removeClass"](this.getIframeContainer(),"fixedHeight")},toggleLoading:function(t){BX[t?"addClass":"removeClass"](this.getIframeContainer(),"loading")},stopMonitorContent:function(){this.vars.resizeLock=true},startMonitorContent:function(){this.vars.resizeLock=false;if(this.vars.resizeInterval===false){this.vars.resizeInterval=setInterval(BX.proxy(this.onContentResize,this),300)}},setCallbacks:function(t){if(BX.type.isPlainObject(t)){BX.Tasks.each(t,function(t,e){if(t=="#SHOW_ADDED_TASK_DETAIL#"){return}if(t!==false&&(BX.type.isFunction(t)||BX.type.isNotEmptyString(t))){this.vars.callbacks[e]=t}}.bind(this))}},showCreateForm:function(){this.add()},parseUrl:function(t){var e=this.opts.pathToTasks;if(e){e=e.toLowerCase().replace("#action#","(view|edit){1}").replace("#task_id#","(\\d+)");var n=t.match(new RegExp(e));if(n&&BX.type.isArray(n)){var i=n[1]||false;var s=n[2]||false;if(i&&s){return{action:i,taskId:parseInt(s)}}}}return null},onTaskAdded:function(t,e,n,i,s){BX.onCustomEvent(this,"onTaskAdded",[t,e,n,i,s])},onTaskChanged:function(t,e,n,i,s){BX.onCustomEvent(this,"onTaskChanged",[t,e,n,i,s])},onTaskDeleted:function(t){BX.onCustomEvent(this,"onTaskDeleted",[t])}});BX.Tasks.Component.IframePopup.create=function(t){if(window.top!=window){return}if(typeof BX.Tasks.Singletons=="undefined"){BX.Tasks.Singletons={}}if(typeof BX.Tasks.Singletons.iframePopup=="undefined"){BX.Tasks.Singletons.iframePopup=new BX.Tasks.Component.IframePopup(t);window.taskIFramePopup=BX.Tasks.Singletons.iframePopup;window.BX.TasksIFrameInst=BX.Tasks.Singletons.iframePopup}else{BX.Tasks.Singletons.iframePopup.setCallbacks(t.callbacks)}return BX.Tasks.Singletons.iframePopup};
/* End */
;
; /* Start:"a:4:{s:4:"full";s:86:"/bitrix/components/ndx/notification.header/templates/.default/script.js?16686120017829";s:6:"source";s:71:"/bitrix/components/ndx/notification.header/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
function createForm(userData){
    return BX.create({
        tag:'form',
        children:[
            BX.create({
                tag: 'input',
                props: {id: 'emailUserBirthday_'+userData.ID,name: 'emailUserBirthday',type:'hidden',className:'form-control',value:userData.EMAIL}
            }),
            BX.create({
                tag: 'input',
                props: {id: 'idUserBirthday_'+userData.ID,name: 'idUserBirthday',type:'hidden',className:'form-control',value:userData.ID}
            }),

            BX.create({
                tag:'div',
                attrs:{className:'row'},
                children:[
                    BX.create({
                        tag:'label',
                        attrs:{for:'nameUserBirthday_'+userData.ID},
                        text:'Обратись к коллеге',

                    }),
                    BX.create({
                        tag: 'input',
                        props: {id: 'nameUserBirthday_'+userData.ID,name: 'nameUserBirthday',type:'text',className:'form-control',value:userData.NAME}
                    })
                ]
            }),
            BX.create({
                tag:'div',
                attrs:{className:'row'},
                children:[
                    BX.create({
                        tag:'label',
                        attrs:{for:'messageBirthday_'+userData.ID},
                        text:'Напиши ему пару приятных слов',
                    }),
                    BX.create({
                        tag: 'textarea',
                        props: {id: 'messageBirthday_'+userData.ID,name: 'messageBirthday',rows:5}
                    })
                ]
            }),
            BX.create({
                tag:'div',
                attrs:{className:'row checkbox'},
                children:[
                    BX.create({
                        tag: 'input',
                        props: {id: 'sendNoName_'+userData.ID,name: 'sendNoName',type:'checkbox',className:'form-control',value:1}
                    }),
                    BX.create({
                        tag:'label',
                        attrs:{for:'sendNoName_'+userData.ID},
                        props:{className:'checkbox__label'},
                        children:[
                            BX.create({
                                tag:"div",
                                text:"Отправить анонимно"
                            })
                        ]
                    }),
                ]
            }),

            createSlider(userData.ID),
            BX.create({
                tag:'div',
                attrs:{className:'birthday-button'},
                text:'Поздравить',
                events: {
                    click: function () {
                        var popup = BX.PopupWindowManager.getCurrentPopup();
                        var form = new FormData(this.parentElement);
                        send(popup,form)

                    }
                }
            }),
        ]
    })
}

function send(pop,form){

    BX.ajax.runComponentAction('ndx:birthday', 'sendMessage', {
        mode: 'ajax',
        data: {
            message: form.get('messageBirthday'),
            user:form.get('idUserBirthday'),
            nameUser:form.get('nameUserBirthday'),
            anonimus:form.get('sendNoName'),
            image:document.querySelector(".slick-current.slick-center img").dataset.image,
            sessid: BX.message('bitrix_sessid')
        },
    }).then(function (response) {
        var content=BX.create({
            tag:'div',
            attrs:{className:'row'},
            children:[
                BX.create({
                    tag: 'div',
                    attrs: {className: 'text-center'},
                    html:"<h2>Ваше сообщение успешно отправлено</h2>"
                }),
                BX.create({
                    tag:'div',
                    attrs:{className:'birthday-button'},
                    text:'Закрыть',
                    events: {
                        click: function () {
                            pop.close();
                        }
                    }
                })
            ]
        })
        pop.setTitleBar('');
        pop.setContent(content);
        pop.adjustPosition();
        pop.resizeOverlay();
    },function (response) {

        pop.setContent('Упсс... произошла ошибка. Уже работаем над ее устранением')
    });
}



function createSlider(id){
    return BX.create({
        tag:'div',
        attrs:{className:'birthday-slider birthday-slider_user_'+id},
        children:[
            BX.create({
                tag: 'img',
                attrs: {src: '/bitrix/templates/betboom/images/icons/card_1.png'},
                dataset:{image:1}
            }),
            BX.create({
                tag: 'img',
                attrs: {src: '/bitrix/templates/betboom/images/icons/card_2.png'},
                dataset:{image:2}
            }),
            BX.create({
                tag: 'img',
                attrs: {src: '/bitrix/templates/betboom/images/icons/card_3.png'},
                dataset:{image:3}
            })
        ]
    })
}

function f(el){

    var userData;
    if (el.dataset.user === undefined) {
        return false;
    }

    BX.ajax.runComponentAction('ndx:birthday', 'getUserData', {
        mode: 'ajax',
        data: {
            userid: el.dataset.user
        },
    }).then(function (response) {
        userData  = response;

        if (typeof userData === "object")
        {
            var obPopupWin = BX.PopupWindowManager.create('BirthdayElementUser_'+el.dataset.user, null, {
                autoHide: true,
                content:createForm(userData.data),
                offsetLeft: 0,
                offsetTop: 0,
                overlay: {
                    opacity: 100
                },
                closeByEsc: true,
                titleBar: 'Поздравь коллегу',
                closeIcon: {
                    top:40,
                    right:40
                },
                className: 'birthdayElementUser',
                events:{
                    onAfterPopupShow: function (){
                        obPopupWin.adjustPosition();
                        obPopupWin.resizeOverlay();
                    },
                    onPopupClose: function() {
                        obPopupWin.destroy();
                    }
                }
            });

            //obPopupWin.setContent();
            obPopupWin.show();

            $('.birthday-slider_user_'+el.dataset.user).slick({
                slidesToShow: 3,
                slidesToScroll: 0,
                dots: false,
                centerMode: true,
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 360,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
            ]
                /*infinite:false,
                initialSlide:1*/
            });
        }
    });

}


/* End */
;
; /* Start:"a:4:{s:4:"full";s:75:"/bitrix/components/ndx/birthday/templates/.default/script.js?16686120017829";s:6:"source";s:60:"/bitrix/components/ndx/birthday/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
function createForm(userData){
    return BX.create({
        tag:'form',
        children:[
            BX.create({
                tag: 'input',
                props: {id: 'emailUserBirthday_'+userData.ID,name: 'emailUserBirthday',type:'hidden',className:'form-control',value:userData.EMAIL}
            }),
            BX.create({
                tag: 'input',
                props: {id: 'idUserBirthday_'+userData.ID,name: 'idUserBirthday',type:'hidden',className:'form-control',value:userData.ID}
            }),

            BX.create({
                tag:'div',
                attrs:{className:'row'},
                children:[
                    BX.create({
                        tag:'label',
                        attrs:{for:'nameUserBirthday_'+userData.ID},
                        text:'Обратись к коллеге',

                    }),
                    BX.create({
                        tag: 'input',
                        props: {id: 'nameUserBirthday_'+userData.ID,name: 'nameUserBirthday',type:'text',className:'form-control',value:userData.NAME}
                    })
                ]
            }),
            BX.create({
                tag:'div',
                attrs:{className:'row'},
                children:[
                    BX.create({
                        tag:'label',
                        attrs:{for:'messageBirthday_'+userData.ID},
                        text:'Напиши ему пару приятных слов',
                    }),
                    BX.create({
                        tag: 'textarea',
                        props: {id: 'messageBirthday_'+userData.ID,name: 'messageBirthday',rows:5}
                    })
                ]
            }),
            BX.create({
                tag:'div',
                attrs:{className:'row checkbox'},
                children:[
                    BX.create({
                        tag: 'input',
                        props: {id: 'sendNoName_'+userData.ID,name: 'sendNoName',type:'checkbox',className:'form-control',value:1}
                    }),
                    BX.create({
                        tag:'label',
                        attrs:{for:'sendNoName_'+userData.ID},
                        props:{className:'checkbox__label'},
                        children:[
                            BX.create({
                                tag:"div",
                                text:"Отправить анонимно"
                            })
                        ]
                    }),
                ]
            }),

            createSlider(userData.ID),
            BX.create({
                tag:'div',
                attrs:{className:'birthday-button'},
                text:'Поздравить',
                events: {
                    click: function () {
                        var popup = BX.PopupWindowManager.getCurrentPopup();
                        var form = new FormData(this.parentElement);
                        send(popup,form)

                    }
                }
            }),
        ]
    })
}

function send(pop,form){

    BX.ajax.runComponentAction('ndx:birthday', 'sendMessage', {
        mode: 'ajax',
        data: {
            message: form.get('messageBirthday'),
            user:form.get('idUserBirthday'),
            nameUser:form.get('nameUserBirthday'),
            anonimus:form.get('sendNoName'),
            image:document.querySelector(".slick-current.slick-center img").dataset.image,
            sessid: BX.message('bitrix_sessid')
        },
    }).then(function (response) {
        var content=BX.create({
            tag:'div',
            attrs:{className:'row'},
            children:[
                BX.create({
                    tag: 'div',
                    attrs: {className: 'text-center'},
                    html:"<h2>Ваше сообщение успешно отправлено</h2>"
                }),
                BX.create({
                    tag:'div',
                    attrs:{className:'birthday-button'},
                    text:'Закрыть',
                    events: {
                        click: function () {
                            pop.close();
                        }
                    }
                })
            ]
        })
        pop.setTitleBar('');
        pop.setContent(content);
        pop.adjustPosition();
        pop.resizeOverlay();
    },function (response) {

        pop.setContent('Упсс... произошла ошибка. Уже работаем над ее устранением')
    });
}



function createSlider(id){
    return BX.create({
        tag:'div',
        attrs:{className:'birthday-slider birthday-slider_user_'+id},
        children:[
            BX.create({
                tag: 'img',
                attrs: {src: '/bitrix/templates/betboom/images/icons/card_1.png'},
                dataset:{image:1}
            }),
            BX.create({
                tag: 'img',
                attrs: {src: '/bitrix/templates/betboom/images/icons/card_2.png'},
                dataset:{image:2}
            }),
            BX.create({
                tag: 'img',
                attrs: {src: '/bitrix/templates/betboom/images/icons/card_3.png'},
                dataset:{image:3}
            })
        ]
    })
}

function f(el){

    var userData;
    if (el.dataset.user === undefined) {
        return false;
    }

    BX.ajax.runComponentAction('ndx:birthday', 'getUserData', {
        mode: 'ajax',
        data: {
            userid: el.dataset.user
        },
    }).then(function (response) {
        userData  = response;

        if (typeof userData === "object")
        {
            var obPopupWin = BX.PopupWindowManager.create('BirthdayElementUser_'+el.dataset.user, null, {
                autoHide: true,
                content:createForm(userData.data),
                offsetLeft: 0,
                offsetTop: 0,
                overlay: {
                    opacity: 100
                },
                closeByEsc: true,
                titleBar: 'Поздравь коллегу',
                closeIcon: {
                    top:40,
                    right:40
                },
                className: 'birthdayElementUser',
                events:{
                    onAfterPopupShow: function (){
                        obPopupWin.adjustPosition();
                        obPopupWin.resizeOverlay();
                    },
                    onPopupClose: function() {
                        obPopupWin.destroy();
                    }
                }
            });

            //obPopupWin.setContent();
            obPopupWin.show();

            $('.birthday-slider_user_'+el.dataset.user).slick({
                slidesToShow: 3,
                slidesToScroll: 0,
                dots: false,
                centerMode: true,
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 360,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
            ]
                /*infinite:false,
                initialSlide:1*/
            });
        }
    });

}


/* End */
;
; /* Start:"a:4:{s:4:"full";s:53:"/bitrix/templates/betboom/bitrix24.js?166255828731542";s:6:"source";s:37:"/bitrix/templates/betboom/bitrix24.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/

/*Global Settings */
(function() {

	var iframeMode = window !== window.top;
	var search = window.location.search;
	var sliderMode = search.indexOf("IFRAME=") !== -1 || search.indexOf("IFRAME%3D") !== -1;



	if (iframeMode && sliderMode)
	{

		return;
	}
	else if (iframeMode)
	{

		window.top.location = window.location.href;
		return;
	}


	BX.addCustomEvent("onFrameDataRequestFail", function(response) {
		top.location = "/auth/?backurl=" + encodeURIComponent(B24.getBackUrl());
	});

	BX.addCustomEvent("onAjaxFailure", function(status) {
		var redirectUrl = "/auth/?backurl=" + B24.getBackUrl();
		if (status == "auth" && typeof(window.frameRequestStart) !== "undefined")
		{
			top.location = redirectUrl;
		}
	});

	BX.addCustomEvent("onPopupWindowInit", function(uniquePopupId, bindElement, params) {
		//if (BX.util.in_array(uniquePopupId, ["task-legend-popup"]))
		//	params.lightShadow = true;

		if (uniquePopupId == "bx_log_filter_popup")
		{
			params.lightShadow = true;
			params.className = "";
		}
		else if (uniquePopupId == "task-legend-popup")
		{
			params.lightShadow = true;
			params.offsetTop = -15;
			params.offsetLeft = -670;
			params.angle = {offset : 740};
		}
		else if ((uniquePopupId == "task-gantt-filter") || (uniquePopupId == "task-list-filter"))
		{
			params.lightShadow = true;
			params.className = "";
		}
		else if (uniquePopupId.indexOf("sonet_iframe_popup_") > -1)
		{
			params.lightShadow = true;
		}
	});

	BX.addCustomEvent("onJCClockInit", function(config) {

		JCClock.setOptions({
			"centerXInline" : 83,
			"centerX" : 83,
			"centerYInline" : 67,
			"centerY" : 79,
			"minuteLength" : 31,
			"hourLength" : 26,
			"popupHeight" : 229,
			"inaccuracy" : 15,
			"cancelCheckClick" : true
		});
	});

	/*BX.PopupWindow.setOptions({
		"angleMinTop" : 35,
		"angleMinRight" : 10,
		"angleMinBottom" : 35,
		"angleMinLeft" : 10,
		"angleTopOffset" : 5,
		"angleLeftOffset" : 45,
		"offsetLeft" : 0 //-15,
		"offsetTop" : 2,
		"positionTopXOffset" : -11 //20
	});*/

	BX.addCustomEvent("onPullEvent-main", function(command,params){
		console.log(command)
		console.log(params)
		BX.UI.Notification.Center.notify({
			content: command,
			autoHide:false,
			id: 'test'
		});

		if (command == "user_counter" && params[BX.message("SITE_ID")])
		{
			var counters = BX.clone(params[BX.message('SITE_ID')]);
			B24.updateCounters(counters, false);
		}
	});

	BX.addCustomEvent("onPullEvent-bitrix24", BX.delegate(function(command,params){
		if (command == "userLimitNotify")
		{
			BX.UI.Notification.Center.notify({
				content: params.message
			});
		}
	}, this));

	BX.addCustomEvent(window, "onImUpdateCounter", function(counters){

		if (!counters)
			return;

		B24.updateCounters(BX.clone(counters), false);
	});

	BX.addCustomEvent("onCounterDecrement", function(iDecrement) {
		B24.decrementCounter(BX("menu-counter-live-feed"), iDecrement)
	});

	BX.addCustomEvent("onImUpdateCounterNotify", function(counter) {
		B24.updateInformer(BX("im-informer-events", true), counter);
	});

	BX.addCustomEvent("onImUpdateCounterMessage", function(counter) {
		B24.updateInformer(BX("im-informer-messages", true), counter);
		B24.updateCounters({'im-message': counter}, false);
	});

	BX.addCustomEvent("onImUpdateCounterNetwork", function(counter) {
		B24.updateInformer(BX("b24network-informer-events", true), counter);
	});

	BX.addCustomEvent("Kanban.Grid:onFixedModeStart", function() {
		BX.ready(function() {
			BX("footer").style.visibility = "hidden";
		});
	});

	BX.addCustomEvent("Intranet.Search.Title:onFocusAction", function(type)
	{
		if (!BX.type.isDomNode(BX("header-buttons")) || !BX("header-buttons").querySelector(".ui-btn"))
		{
			return;
		}

		var timeman = BX('timeman-container');
		var header = BX('header');

		if (!BX.type.isDomNode(timeman) || !BX.type.isDomNode(header))
		{
			return;
		}

		if (type === "gain")
		{
			timeman.style.webkitTransition = 'min-width .2s, width .2s, opacity .1s, padding .2s';
			header.style.width = header.offsetWidth + 'px';
			if (document.body.offsetWidth < 1660) {
				timeman.style.opacity = '0';
				setTimeout(function() {
					BX.addClass(timeman, "timeman-container--hide");
				}.bind(this), 100);
			}
		}
		else if (type === "lost")
		{
			timeman.style.webkitTransition = 'min-width .2s, width .2s, opacity .3s, padding .2s';
			BX.removeClass(timeman, "timeman-container--hide");
			setTimeout(function() {
				timeman.style.opacity = '1';
				header.removeAttribute("style");
			}.bind(this), 300);
		}
	});

//connection status===
	BX.addCustomEvent("onPullError", BX.delegate(function(error, code) {
		if (error == 'AUTHORIZE_ERROR')
		{
			B24.connectionStatus("offline");
		}
		else if (error == 'RECONNECT' && (code == 1008 || code == 1006))
		{
			B24.connectionStatus("connecting");
		}
	}, this));

	BX.addCustomEvent("onImError", BX.delegate(function(error, sendErrorCode) {
		if (error == 'AUTHORIZE_ERROR' || error == 'SEND_ERROR' && sendErrorCode == 'AUTHORIZE_ERROR')
		{
			B24.connectionStatus("offline");
		}
		else if (error == 'CONNECT_ERROR')
		{
			B24.connectionStatus("offline");
		}
	}, this));

	BX.addCustomEvent("onPullStatus", BX.delegate(function(status){
		if (status == 'offline')
			B24.connectionStatus("offline");
		else
			B24.connectionStatus("online");
	}, this));

//==connection status

	if (BX.browser.SupportLocalStorage())
	{
		BX.addCustomEvent(window, 'onLocalStorageSet', function(params)
		{
			if (params.key.substring(0, 4) == 'lmc-')
			{
				var counters = {};
					counters[params.key.substring(4)] = params.value;
				B24.updateCounters(counters, false);
			}
		});
	}

	if (BX.getClass("BX.rest.AppLayout"))
	{
		var placementInterface = BX.rest.AppLayout.initializePlacement("DEFAULT");
		placementInterface.prototype.showHelper = function(params, cb)
		{
			var query = "";
			if (BX.type.isNumber(params))
			{
				query = "redirect=detail&code=" + params;
			}
			else if (BX.type.isNotEmptyString(params))
			{
				query = params;
			}
			else if (BX.type.isPlainObject(params))
			{
				for (var param in params)
				{
					if (query.length)
					{
						query += "&";
					}

					query += param + "=" + params[param];
				}
			}

			if (query.length)
			{
				BX.Helper.show(query);
			}
		};
	}

	BX.ready(function () {
		BX.bind(window, "scroll", BX.throttle(B24.onScroll, 150, B24));
	});
})();

var B24 = {

	b24ConnectionStatusState: "online",
	b24ConnectionStatus: null,
	b24ConnectionStatusText: null,
	b24ConnectionStatusTimeout: null,

	formateDate : function(time){
		return BX.util.str_pad(time.getHours(), 2, '0', 'left') + ':' + BX.util.str_pad(time.getMinutes(), 2, '0', 'left');
	},

	openLanguagePopup: function(button)
	{
		if (!BX.type.isDomNode(BX("b24LangPopupContent")))
			return;

		BX.PopupWindowManager.create('b24LangPopup', button, {
			content: BX("b24LangPopupContent"),
			closeIcon: false,
			autoHide: true,
			closeByEsc: true,
			angle: {offset: 50}
		}).show();
	},

	changeLanguage: function(lang)
	{
		window.location.href = "/auth/?user_lang=" + lang + "&backurl=" + B24.getBackUrl();
	},

	getBackUrl: function()
	{
		var backUrl = window.location.pathname;
		var query = B24.getQueryString(["logout", "login", "back_url_pub", "user_lang"]);
		return backUrl + (query.length > 0 ? "?" + query : "");
	},

	getQueryString : function(ignoredParams)
	{
		var query = window.location.search.substring(1);
		if (!BX.type.isNotEmptyString(query))
		{
			return "";
		}

		var vars = query.split("&");
		ignoredParams = BX.type.isArray(ignoredParams) ? ignoredParams : [];

		var result = "";
		for (var i = 0; i < vars.length; i++)
		{
			var pair = vars[i].split("=");
			var equal = vars[i].indexOf("=");
			var key = pair[0];
			var value = BX.type.isNotEmptyString(pair[1]) ? pair[1] : false;
			if (!BX.util.in_array(key, ignoredParams))
			{
				if (result !== "")
				{
					result += "&";
				}
				result += key + (equal !== -1 ? "=" : "") + (value !== false ? value : "" );
			}
		}

		return result;
	},

	updateInformer : function(informer, counter)
	{
		if (!informer)
			return false;

		if (counter > 0)
		{
			informer.innerHTML = counter;
			BX.addClass(informer, "header-informer-act");
		}
		else
		{
			informer.innerHTML = "";
			BX.removeClass(informer, "header-informer-act");
		}
	},

	updateCounters : function(counters, send)
	{
		BX.ready(function ()
		{
			if (BX.getClass("BX.Intranet.LeftMenu"))
			{
				BX.Intranet.LeftMenu.updateCounters(counters, send);
			}
		});
	},

	decrementCounter : function(node, iDecrement)
	{
		BX.ready(function ()
		{
			if (BX.getClass("BX.Intranet.LeftMenu"))
			{
				BX.Intranet.LeftMenu.decrementCounter(node, iDecrement);
			}
		});
	},

	showNotifyPopup : function(button)
	{
		if (BX.hasClass(button, "header-informer-press"))
		{
			BX.removeClass(button, "header-informer-press");
			BXIM.closeNotify();
		}
		else
		{
			BXIM.openNotify();
		}
	},

	showMessagePopup : function(button)
	{
		if (typeof(BXIM) == 'undefined')
			return false;

		BXIM.toggleMessenger();
	},

	closeBanner : function(bannerId)
	{
		BX.userOptions.save('bitrix24', 'banners',  bannerId, 'Y');
		var banner = BX("sidebar-banner-" + bannerId);
		if (banner)
		{
			banner.style.minHeight = "auto";
			banner.style.overflow = "hidden";
			banner.style.border = "none";
			(new BX.easing({
				duration : 500,
				start : { height : banner.offsetHeight, opacity : 100 },
				finish : { height : 0, opacity: 0 },
				transition : BX.easing.makeEaseOut(BX.easing.transitions.quart),
				step : function(state){
					if (state.height >= 0)
					{
						banner.style.height = state.height + "px";
						banner.style.opacity = state.opacity/100;
					}

					if (state.height <= 17)
					{
						banner.style.marginBottom = state.height + "px";
					}
				},
				complete : function() {
					banner.style.display = "none";
				}
			})).animate();
		}
	},

	showLoading: function(timeout)
	{
		timeout = timeout || 500;
		function show()
		{
			var loader = BX("b24-loader");
			if (loader)
			{
				BX.addClass(loader, "b24-loader-show intranet-loader-show");
				return true;
			}

			return false;
		}

		setTimeout(function() {
			if (!show() && !BX.isReady)
			{
				BX.ready(show);
			}
		}, timeout);
	}
};

/***************** UP button **********************/
B24.onScroll = function()
{
	var windowScroll = BX.GetWindowScrollPos();
	if (B24.b24ConnectionStatus)
	{
		if (B24.b24ConnectionStatus.getAttribute('data-float') == 'true')
		{
			if (windowScroll.scrollTop < 60)
			{
				BX.removeClass(B24.b24ConnectionStatus, 'bx24-connection-status-float');
				B24.b24ConnectionStatus.setAttribute('data-float', 'false');
			}
		}
		else
		{
			if (windowScroll.scrollTop > 60)
			{
				BX.addClass(B24.b24ConnectionStatus, 'bx24-connection-status-float');
				B24.b24ConnectionStatus.setAttribute('data-float', 'true');
			}
		}
	}
};

B24.goUp = function(fn)
{
	var windowScroll = BX.GetWindowScrollPos();

	(new BX.easing({
		duration : 500,
		start : { scroll : windowScroll.scrollTop },
		finish : { scroll : 0 },
		transition : BX.easing.makeEaseOut(BX.easing.transitions.quart),
		step : function(state){
			window.scrollTo(0, state.scroll);
		},
		complete: function() {
			BX.onCustomEvent(window, 'onGoUp');

			if (BX.type.isFunction(fn))
			{
				fn();
			}

		}
	})).animate();
};

/***************** Left Menu ************************/
B24.toggleMenu = function(menuItem, messageShow, messageHide)
{
	var menuBlock = BX.findChild(menuItem.parentNode, {tagName:'ul'}, false, false);

	var menuItems = BX.findChildren(menuBlock, {tagName : "li"}, false);
	if (!menuItems)
		return;

	var toggleText = BX.findChild(menuItem, {className:"menu-toggle-text"}, true, false);
	if (!toggleText)
		return;

	if (BX.hasClass(menuBlock, "menu-items-close"))
	{
		menuBlock.style.height = "0px";
		BX.removeClass(menuBlock, "menu-items-close");
		BX.removeClass(BX.nextSibling(BX.nextSibling(menuItem)), "menu-items-close");
		menuBlock.style.opacity = 0;
		animation(true, menuBlock, menuBlock.scrollHeight);

		toggleText.innerHTML = messageHide;
		BX.userOptions.save("bitrix24", menuItem.id, "hide", "N");
	}
	else
	{
		animation(false, menuBlock, menuBlock.offsetHeight);
		toggleText.innerHTML = messageShow;
		BX.userOptions.save("bitrix24", menuItem.id, "hide", "Y");
	}

	function animation(opening, menuBlock, maxHeight)
	{
		menuBlock.style.overflow = "hidden";
		(new BX.easing({
			duration : 200,
			start : { opacity: opening ? 0 : 100, height: opening ? 0 : maxHeight },
			finish : { opacity: opening ? 100 : 0, height: opening ? maxHeight : 0 },
			transition : BX.easing.transitions.linear,
			step : function(state)
			{
				menuBlock.style.opacity = state.opacity/100;
				menuBlock.style.height = state.height + "px";

			},
			complete : function()
			{
				if (!opening)
				{
					BX.addClass(menuBlock, "menu-items-close");
					BX.addClass(BX.nextSibling(BX.nextSibling(menuItem)), "menu-items-close");
				}
				menuBlock.style.cssText = "";
			}

		})).animate();
	}
};

B24.licenseInfoPopup = {
	show: function(popupId, title, content, showDemoButton)
	{
		if (BX.getClass("BX.Bitrix24.LicenseInfoPopup"))
		{
			BX.Bitrix24.LicenseInfoPopup.show(popupId, title, content, showDemoButton);
		}
	}
};

function showPartnerForm(arParams)
{
	BX = window.BX;
	BX.Bitrix24PartnerForm =
	{
		bInit: false,
		popup: null,
		arParams: {}
	};
	BX.Bitrix24PartnerForm.arParams = arParams;
	BX.message(arParams['MESS']);
	BX.Bitrix24PartnerForm.popup = BX.PopupWindowManager.create("BXPartner", null, {
		autoHide: false,
		zIndex: 0,
		offsetLeft: 0,
		offsetTop: 0,
		overlay : true,
		draggable: {restrict:true},
		closeByEsc: true,
		titleBar: BX.message('BX24_PARTNER_TITLE'),
		closeIcon: { right : "12px", top : "10px"},
		buttons: [
			new BX.PopupWindowButtonLink({
				text: BX.message('BX24_CLOSE_BUTTON'),
				className: "popup-window-button-link-cancel",
				events: { click : function()
				{
					this.popupWindow.close();
				}}
			})
		],
		content: '<div style="width:450px;height:230px"></div>',
		events: {
			onAfterPopupShow: function()
			{
				this.setContent('<div style="width:450px;height:230px">'+BX.message('BX24_LOADING')+'</div>');
				BX.ajax.post(
					'/bitrix/tools/b24_site_partner.php',
					{
						lang: BX.message('LANGUAGE_ID'),
						site_id: BX.message('SITE_ID') || '',
						arParams: BX.Bitrix24PartnerForm.arParams
					},
					BX.delegate(function(result)
						{
							this.setContent(result);
						},
						this)
				);
			}
		}
	});

	BX.Bitrix24PartnerForm.popup.show();
}

/****************** Timemanager *********************/
B24.Timemanager = {

	inited : false,

	layout : {
		block : null,
		timer : null,
		info : null,
		event : null,
		tasks : null,
		status : null
	},

	data : null,
	timer : null,
	clock : null,

	formatTime : function(ts, bSec)
	{
		return BX.util.str_pad(parseInt(ts/3600), 2, '0', 'left')+':'+BX.util.str_pad(parseInt(ts%3600/60), 2, '0', 'left')+(!!bSec ? (':'+BX.util.str_pad(ts%60, 2, '0', 'left')) : '');
	},

	formatWorkTime : function(h, m, s)
	{
		return '<span class="tm-popup-notice-time-hours"><span class="tm-popup-notice-time-number">' + h + '</span></span><span class="tm-popup-notice-time-minutes"><span class="tm-popup-notice-time-number">' + BX.util.str_pad(m, 2, '0', 'left') + '</span></span><span class="tm-popup-notice-time-seconds"><span class="tm-popup-notice-time-number">' + BX.util.str_pad(s, 2, '0', 'left') + '</span></span>';
	},

	formatCurrentTime : function(hours, minutes, seconds)
	{
		var mt = "";
		if (BX.isAmPmMode())
		{
			mt = "AM";
			if (hours > 12)
			{
				hours = hours - 12;
				mt = "PM";
			}
			else if (hours == 0)
			{
				hours = 12;
				mt = "AM";
			}
			else if (hours == 12)
			{
				mt = "PM";
			}

			mt = '<span class="time-am-pm">' + mt + '</span>';
		}
		else
			hours = BX.util.str_pad(hours, 2, "0", "left");

		return '<span class="time-hours">' + hours + '</span>' +
			'<span class="time-semicolon">:</span>' +
			'<span class="time-minutes">' + BX.util.str_pad(minutes, 2, "0", "left") + '</span>' +
			mt;
	},

	init : function(reportJson)
	{
		BX.addCustomEvent("onTimeManDataRecieved", BX.proxy(this.onDataRecieved, this));
		BX.addCustomEvent("onTimeManNeedRebuild", BX.proxy(this.onDataRecieved, this));
		BX.addCustomEvent("onPlannerDataRecieved", BX.proxy(this.onPlannerDataRecieved, this));
		BX.addCustomEvent("onPlannerQueryResult", BX.proxy(this.onPlannerQueryResult, this));
		BX.addCustomEvent("onTaskTimerChange", BX.proxy(this.onTaskTimerChange, this));

		BX.timer.registerFormat("worktime_notice_timeman",BX.proxy(this.formatWorkTime, this));
		BX.timer.registerFormat("bitrix24_time",BX.proxy(this.formatCurrentTime, this));

		BX.addCustomEvent(window, "onTimemanInit", BX.proxy(function() {

			this.inited = true;

			this.layout.block = BX("timeman-block");
			this.layout.timer = BX("timeman-timer");
			this.layout.info = BX("timeman-info");
			this.layout.event = BX("timeman-event");
			this.layout.tasks = BX("timeman-tasks");
			this.layout.status = BX("timeman-status");
			this.layout.statusBlock = BX("timeman-status-block");
			this.layout.taskTime = BX("timeman-task-time");
			this.layout.taskTimer = BX("timeman-task-timer");

			window.BXTIMEMAN.ShowFormWeekly(reportJson);

			BX.bind(this.layout.block, "click", BX.proxy(this.onTimemanClick, this));

			BXTIMEMAN.setBindOptions({
				node: this.layout.block,
				mode: "popup",
				popupOptions: {
					angle : { position : "top", offset : 130},
					offsetTop : 10,
					autoHide : true,
					offsetLeft : -60,
					zIndex : -1,
					events : {
						onPopupClose : BX.proxy(function() {
							BX.removeClass(this.layout.block, "timeman-block-active");
						}, this)
					}
				}
			});

			this.redraw();

		}, this));
	},

	onTimemanClick : function()
	{
		BX.addClass(this.layout.block, "timeman-block-active");
		BXTIMEMAN.Open();
	},

	onTaskTimerChange : function(params)
	{
		if (params.action === 'refresh_daemon_event')
		{
			if(!!this.taskTimerSwitch)
			{
				this.layout.taskTime.style.display = '';
				if(this.layout.info.style.display != 'none')
				{
					this.layout.statusBlock.style.display = 'none';
				}
				this.taskTimerSwitch = false;
			}

			var s = '';
			s += this.formatTime(parseInt(params.data.TIMER.RUN_TIME||0) + parseInt(params.data.TASK.TIME_SPENT_IN_LOGS||0), true);

			if(!!params.data.TASK.TIME_ESTIMATE && params.data.TASK.TIME_ESTIMATE > 0)
			{
				s += ' / ' + this.formatTime(parseInt(params.data.TASK.TIME_ESTIMATE));
			}

			this.layout.taskTimer.innerHTML = s;
		}
		else if(params.action === 'start_timer')
		{
			this.taskTimerSwitch = true;
		}
		else if(params.action === 'stop_timer')
		{
			this.layout.taskTime.style.display = 'none';
			this.layout.statusBlock.style.display = '';
		}
	},

	setTimer : function()
	{
		if (this.timer)
		{
			this.timer.setFrom(new Date(this.data.INFO.DATE_START * 1000));
			this.timer.dt = -this.data.INFO.TIME_LEAKS * 1000;
		}
		else
		{
			this.timer = BX.timer(this.layout.timer, {
				from: new Date(this.data.INFO.DATE_START*1000),
				dt: -this.data.INFO.TIME_LEAKS * 1000,
				display: "simple"
			});
		}
	},

	stopTimer : function()
	{
		if (this.timer != null)
		{
			BX.timer.stop(this.timer);
			this.timer = null;
		}
	},

	redraw_planner: function(data)
	{
		if(!!data.TASKS_ENABLED)
		{
			data.TASKS_COUNT = !data.TASKS_COUNT ? 0 : data.TASKS_COUNT;
			this.layout.tasks.innerHTML = data.TASKS_COUNT;
			this.layout.tasks.style.display = data.TASKS_COUNT == 0 ? "none" : "inline-block";
		}

		if(!!data.CALENDAR_ENABLED)
		{
			this.layout.event.innerHTML = data.EVENT_TIME;
			this.layout.event.style.display = data.EVENT_TIME == '' ? 'none' : 'inline-block';
		}

		this.layout.info.style.display =
			(BX.style(this.layout.tasks, "display") == 'none' && BX.style(this.layout.event, "display") == 'none')
				? 'none'
				: 'block';
	},

	redraw : function()
	{
		this.redraw_planner(this.data.PLANNER);

		if (this.data.STATE == "CLOSED" && (this.data.CAN_OPEN == "REOPEN" || !this.data.CAN_OPEN))
			this.layout.status.innerHTML = this.getStatusName("COMPLETED");
		else
			this.layout.status.innerHTML = this.getStatusName(this.data.STATE);

		// if (this.data.STATE == "OPENED")
		// 	this.setTimer();
		// else
		// {
		// 	this.stopTimer();
		// 	var workedTime = (this.data.INFO.DATE_FINISH - this.data.INFO.DATE_START - this.data.INFO.TIME_LEAKS);
		// 	this.layout.timer.innerHTML = BX.timeman.formatTime(workedTime);
		// }
		if (!this.timer)
			this.timer = BX.timer({container: this.layout.timer, display : "bitrix24_time"}); //BX.timer.clock(this.layout.timer);

		var statusClass = "";
		if (this.data.STATE == "CLOSED")
		{
			if (this.data.CAN_OPEN == "REOPEN" || !this.data.CAN_OPEN)
				statusClass = "timeman-completed";
			else
				statusClass = "timeman-start";
		}
		else if (this.data.STATE == "PAUSED")
			statusClass = "timeman-paused";
		else if (this.data.STATE == "EXPIRED")
			statusClass = "timeman-expired";

		BX.removeClass(this.layout.block, "timeman-completed timeman-start timeman-paused timeman-expired");
		BX.addClass(this.layout.block, statusClass);

		if (statusClass == "timeman-start" || statusClass == "timeman-paused")
		{
			this.startAnimation();
		}
		else
		{
			this.endAnimation();
		}
	},

	getStatusName : function(id)
	{
		return BX.message("TM_STATUS_" + id);
	},

	onDataRecieved : function(data)
	{
		data.OPEN_NOW = false;

		this.data = data;

		if (this.inited)
			this.redraw();
	},

	onPlannerQueryResult : function(data, action)
	{
		if (this.inited)
			this.redraw_planner(data);
	},

	onPlannerDataRecieved : function(ob, data)
	{
		if (this.inited)
			this.redraw_planner(data);
	},

	animation : null,
	animationTimeout : 30000,
	blinkAnimation : null,
	blinkLimit : 10,
	blinkTimeout : 750,

	startAnimation : function()
	{
		if (this.animation !== null)
		{
			this.endAnimation();
		}

		this.startBlink();
		this.animation = setInterval(BX.proxy(this.startBlink, this), this.animationTimeout);
	},

	endAnimation : function()
	{
		this.endBlink();

		if (this.animation)
		{
			clearInterval(this.animation);
		}

		this.animation = null;
	},

	startBlink : function()
	{
		if (this.blinkAnimation !== null)
		{
			this.endBlink();
		}

		var counter = 0;
		this.blinkAnimation = setInterval(BX.proxy(function()
		{
			if (++counter >= this.blinkLimit)
			{
				clearInterval(this.blinkAnimation);
				BX.show(BX("timeman-background", true));
			}
			else
			{
				BX.toggle(BX("timeman-background", true));
			}

		}, this), this.blinkTimeout);
	},

	endBlink : function()
	{
		if (this.blinkAnimation)
		{
			clearInterval(this.blinkAnimation);
		}

		BX("timeman-background", true).style.cssText = "";
		this.blinkAnimation = null;
	}
};

/****************** Invite Dialog *******************/
B24.Bitrix24InviteDialog =
{
	bInit: false,
	popup: null,
	arParams: {}
};

B24.Bitrix24InviteDialog.Init = function(arParams)
{
	if(arParams)
		B24.Bitrix24InviteDialog.arParams = arParams;

	if(B24.Bitrix24InviteDialog.bInit)
		return;

	BX.message(arParams['MESS']);

	B24.Bitrix24InviteDialog.bInit = true;

	BX.ready(BX.delegate(function()
	{
		B24.Bitrix24InviteDialog.popup = BX.PopupWindowManager.create("B24InviteDialog", null, {
			autoHide: false,
			zIndex: 0,
			offsetLeft: 0,
			offsetTop: 0,
			overlay:true,
			draggable: {restrict:true},
			closeByEsc: true,
			titleBar: BX.message('BX24_INVITE_TITLE_INVITE'),
			contentColor: "white",
			contentNoPaddings: true,
			closeIcon: { right : "12px", top : "10px"},
			buttons: [
			],
			className: 'bx-b24-invite-dialog-popup',
			content: '<div style="width:500px;height:300px; background: url(/bitrix/templates/bitrix24/images/loader.gif) no-repeat center;"></div>',
			events: {
				onAfterPopupShow: function()
				{
					B24.Bitrix24InviteDialog.loadForm();
				},
				onPopupClose: function()
				{
					BX.InviteDialog.onInviteDialogClose();
				}
			}
		});
	}, this));
};

B24.Bitrix24InviteDialog.ShowForm = function(arParams)
{
	B24.Bitrix24InviteDialog.Init(arParams);
	B24.Bitrix24InviteDialog.popup.show();
};

B24.Bitrix24InviteDialog.loadForm = function()
{
	B24.Bitrix24InviteDialog.popup.setContent('<div style="width:500px;height:300px; background: url(/bitrix/templates/bitrix24/images/loader.gif) no-repeat center;"></div>');
	BX.ajax.post(
		'/bitrix/tools/intranet_invite_dialog.php',
		{
			lang: BX.message('LANGUAGE_ID'),
			site_id: BX.message('SITE_ID') || '',
			arParams: B24.Bitrix24InviteDialog.arParams
		},
		BX.delegate(function(result)
			{
				B24.Bitrix24InviteDialog.popup.setContent(result);
				B24.Bitrix24InviteDialog.popup.adjustPosition();
			},
			this)
	);
};

B24.Bitrix24InviteDialog.ReInvite = function(reinvite_user_id)
{
	BX.ajax.post(
		'/bitrix/tools/intranet_invite_dialog.php',
		{
			lang: BX.message('LANGUAGE_ID'),
			site_id: BX.message('SITE_ID') || '',
			reinvite: reinvite_user_id,
			sessid: BX.bitrix_sessid()
		},
		BX.delegate(function(result)
			{
			},
			this)
	);
};

B24.connectionStatus = function(status)
{
	if (!(status == 'online' || status == 'connecting' || status == 'offline'))
		return false;

	if (this.b24ConnectionStatusState == status)
		return false;

	this.b24ConnectionStatusState = status;

	var statusClass = '';

	if (status == 'offline')
	{
		b24ConnectionStatusStateText = BX.message('BITRIX24_CS_OFFLINE');
		statusClass = 'bx24-connection-status-offline';
	}
	else if (status == 'connecting')
	{
		b24ConnectionStatusStateText = BX.message('BITRIX24_CS_CONNECTING');
		statusClass = 'bx24-connection-status-connecting';
	}
	else if (status == 'online')
	{
		b24ConnectionStatusStateText = BX.message('BITRIX24_CS_ONLINE');
		statusClass = 'bx24-connection-status-online';
	}

	clearTimeout(this.b24ConnectionStatusTimeout);

	var connectionPopup = document.querySelector('[data-role="b24-connection-status"]');
	if (!connectionPopup)
	{
		var windowScroll = BX.GetWindowScrollPos();
		var isFloat = windowScroll.scrollTop > 60;

		this.b24ConnectionStatus = BX.create("div", {
			attrs : {
				className : "bx24-connection-status "+(this.b24ConnectionStatusState == 'online'? "bx24-connection-status-hide": "bx24-connection-status-show bx24-connection-status-"+this.b24ConnectionStatusState)+(isFloat? " bx24-connection-status-float": ""),
				"data-role" : "b24-connection-status",
				"data-float" : isFloat? "true": "false"
			},
			children : [
				BX.create("div", { props : { className : "bx24-connection-status-wrap" }, children : [
					this.b24ConnectionStatusText = BX.create("span", { props : { className : "bx24-connection-status-text"}, html: b24ConnectionStatusStateText}),
					BX.create("span", { props : { className : "bx24-connection-status-text-reload"}, children : [
						BX.create("span", { props : { className : "bx24-connection-status-text-reload-title"}, html: BX.message('BITRIX24_CS_RELOAD')}),
						BX.create("span", { props : { className : "bx24-connection-status-text-reload-hotkey"}, html: (BX.browser.IsMac()? "&#8984;+R": "Ctrl+R")})
					], events: {
						'click': function(){ location.reload() }
					}})
				]})
			]
		});
	}
	else
	{
		this.b24ConnectionStatus = connectionPopup;
	}

	if (!this.b24ConnectionStatus)
		return false;

	if (status == 'online')
	{
		clearTimeout(this.b24ConnectionStatusTimeout);
		this.b24ConnectionStatusTimeout = setTimeout(BX.delegate(function(){
			BX.removeClass(this.b24ConnectionStatus, "bx24-connection-status-show");
			this.b24ConnectionStatusTimeout = setTimeout(BX.delegate(function(){
				BX.removeClass(this.b24ConnectionStatus, "bx24-connection-status-hide");
			}, this), 1000);
		}, this), 4000);
	}

	this.b24ConnectionStatus.className = "bx24-connection-status bx24-connection-status-show "+statusClass+" "+(this.b24ConnectionStatus.getAttribute('data-float') == 'true'? 'bx24-connection-status-float': '');
	this.b24ConnectionStatusText.innerHTML = b24ConnectionStatusStateText;

	if (!connectionPopup)
	{
		var nextNode = BX.findChild(document.body, {className: "bx-layout-inner-table"}, true, false);
		nextNode.parentNode.insertBefore(this.b24ConnectionStatus, nextNode);
	}

	return true;
};

B24.showPartnerOrderForm = function (params)
{
	if (typeof params !== "object")
		return;

	BX.PopupWindowManager.create("B24PartnerOrderForm", null, {
		autoHide: true,
		zIndex: 0,
		offsetLeft: 0,
		offsetTop: 0,
		overlay: true,
		height: Math.min(document.documentElement.clientHeight - 100, 740),
		width: 560,
		draggable: {restrict:true},
		closeByEsc: true,
		contentColor: "white",
		contentNoPaddings: true,
		content:
			'<script data-b24-form="inline/'+params.id+'/'+params.sec+'" data-skip-moving="true">'+
				'(function(w,d,u){'+
					'var s=d.createElement("script");s.async=true;s.src=u+"?"+(Date.now()/180000|0);'+
					'var h=d.getElementsByTagName("script")[0];h.parentNode.insertBefore(s,h);'+
				'})(window,document,"https://cp.bitrix.ru/upload/crm/form/loader_${params.id}_${params.sec}.js");'+
			'</script>',
		events: {
			onPopupFirstShow: function()
			{
				(function(w,d,u){
					var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);
					var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
				})(window,document,'https://cp.bitrix.ru/upload/crm/form/loader_'+params.id+'_'+params.sec+'.js')
			}
		}
	}).show();
};

B24.upgradeButtonRedirect = function(params)
{
	if (typeof params !== "object")
		return;

	var url = params.COUNTER_URL || "",
		licensePath = params.LICENSE_PATH || "",
		host = params.HOST || "";

	BX.ajax.post(
		url,
		{
			action: "upgradeButton",
			host: host
		},
		BX.proxy(function(){
			document.location.href = licensePath;
		}, this)
	);
}

B24.PopupBlur = function() {
	BX.PopupWindow.apply(this, arguments);
	this.setBlurBg();

	BX.addCustomEvent("OnThemePickerApplyTheme", this.setBlurBg.bind(this));
}

B24.PopupBlur.prototype = {
	__proto__: BX.PopupWindow.prototype,
	constructor: B24.PopupBlur,
	setBlurBg: function()
	{
		var container = this.getPopupContainer();
		var backgroundImage = window.getComputedStyle(document.body).backgroundImage;
		var backgroundColor = window.getComputedStyle(document.body).backgroundColor;

		if (BX.Type.isDomNode(container))
		{
			container.classList.add('popup-window-blur');
		}

		var style = BX.create('style', {
			attrs: {
				type: 'text/css'
			}
		});

		var styles = '.popup-window-content:after { ' + 'background-image: ' + backgroundImage + ';' + 'background-color: ' + backgroundColor + '} ';

		styles = document.createTextNode(styles);
		style.appendChild(styles);
		document.head.appendChild(style);

		if (this.angle) {
			this.setBlurBgAngle();
		}
	},
	setBlurBgAngle: function() {
		var backgroundColor = window.getComputedStyle(document.body).backgroundColor;

		var anglyStyle = BX.create('style', {
			attrs: {
				type: 'text/css'
			}
		});

		var anglyStyles = '.popup-window-angly:after { ' + 'background-color: ' + backgroundColor + '} ';

		anglyStyles = document.createTextNode(anglyStyles);
		anglyStyle.appendChild(anglyStyles);
		document.head.appendChild(anglyStyle);
	},
	setPadding: function(padding)
	{
		if (BX.Type.isNumber(padding) && padding >= 0)
		{
			this.padding = padding;
			this.getContentContainer().style.padding = padding + 'px';
		}
		else if (padding === null)
		{
			this.padding = null;
			this.getContentContainer().style.removeProperty('padding');
		}
	}
};



/* End */
;
; /* Start:"a:4:{s:4:"full";s:48:"/bitrix/templates/betboom/main.js?17053092065958";s:6:"source";s:33:"/bitrix/templates/betboom/main.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
BX.ready(function(){

    window.addEventListener('resize', positionBirthday);

    positionBirthday()

    var param1 = ' global Hello';
    BX.bindDelegate(
        document.body, 'click', {className: 'menu-switcher'},
        function(e){
            if(!e) e = window.event;
            console.log(e.target);
            var main=BX('main-content');
            var menu=BX('main-menu-block');
            if (BX.isNodeHidden(menu))
            {
                BX.addClass(menu,'mobile-visual');
            }else if(BX.hasClass(menu,'mobile-visual')) {
                BX.removeClass(menu,'mobile-visual');
            }else{
                BX.toggleClass(menu,"active");
                BX.toggleClass(main,"menu-block-active");
                BX.setCookie('BITRIX_SM_main_menu', BX.hasClass(menu,"active"),{path:"/"});
            }

            return BX.PreventDefault(e);
        }
    );
    /**
     * нужно подключение CJSCore::Init(array('avatar_editor'));
     * также this.changePhoto для изменения фото
     var resCamera = new BX.AvatarEditor({enableCamera : true});
     if (
     BX('intranet-user-profile-photo-camera')

     )
     {
        BX.hide(BX('intranet-user-profile-photo-camera'));
    }

     BX.bind(BX('intranet-user-profile-photo-camera'), "click", function(){ resCamera.show('camera'); });
     BX.bind(BX('intranet-user-profile-photo-file'), "click", function(){ resCamera.show('file'); });

     BX.addCustomEvent(resCamera, "onApply", BX.proxy(function(file, canvas) {
        var formObj = new FormData();
        if (!file.name)
        {
            file.name = "tmp.png"
        }
        formObj.append('newPhoto', file, file.name);

        this.changePhoto(formObj);
    }, this));

     BX.bind(BX("intranet-user-profile-photo-remove"), "click", BX.proxy(function () {
        if (BX("intranet-user-profile-photo").style.backgroundImage != "")
        {
            this.showConfirmPopup(BX.message("INTRANET_USER_PROFILE_PHOTO_DELETE_CONFIRM"), this.deletePhoto.bind(this));
        }
    }, this))
     */

});

function positionBirthday(){

    var contentBirthday=document.querySelector('.content-birthday');
    window.sliderActive=false;

    if (!contentBirthday) return;

    if (window.innerWidth > 1680 && (BX.hasClass(contentBirthday,'in') || BX.hasClass(contentBirthday,'center')))
    {
        BX.removeClass(contentBirthday,'in');
        BX.removeClass(contentBirthday,'center');
        BX.append(contentBirthday,BX('main-content'));
        $('.birthday-block-users').slick('unslick');
        window.sliderActive=false;
    }

    if (window.innerWidth <= 1680 && !BX.hasClass(contentBirthday,'in'))
    {
        BX.addClass(contentBirthday,'in');
        BX.removeClass(contentBirthday,'center');
        BX.append(contentBirthday,BX('main-menu-block'));
        var britanyDayBlock=contentBirthday.querySelector(".block-date-birthday").offsetHeight;
        var britanyUserBlock=contentBirthday.querySelector(".birthday-block-users").offsetHeight;
        var menuHeight=document.querySelector(".main-menu").offsetHeight;
        contentBirthday.querySelector(".birthday-blocks").style.height=britanyDayBlock+britanyUserBlock+menuHeight+62+"px";
    }

    if (window.innerWidth <= 1280 && !BX.hasClass(contentBirthday,'center'))
    {
        BX.removeClass(contentBirthday,'in');
        BX.addClass(contentBirthday,'center');
        contentBirthday.querySelector(".birthday-blocks").style.height="100%";
        BX.insertAfter(contentBirthday,document.querySelector('.welcome-block-slider'));
        if (!window.sliderActive){
            $('.birthday-block-users').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                centerMode: false,
                focusOnSelect: false,
            });

            if (window.matchMedia("(max-width: 768px)").matches) {
                var slideSmCount = $(".day-title").length;
                var sliderStick=$(".birthday-block-users").slick("getSlick");
                var countSliders=sliderStick.slideCount;

                for (var i = 0; i < countSliders; i++) {

                    if(!!sliderStick.$slides[i])
                    {
                        if (sliderStick.$slides[i].querySelector(".day-title"))
                            $(".birthday-block-users").slick("slickRemove", i);
                    }

                }
            }

            window.sliderActive=true;
        }
    }
}

(function() {
    var siteDir = ('/' + (BX.message.SITE_DIR || '/').replace(/[\\*+?.()|[\]{}]/g, '\\$&') + '/').replace(/\/+/g, '/');
    var color;

    sessionStorage.getItem("UF_WHITE_THEME") ? color="#ffffff":color="#181818";
    BX.SidePanel.Instance.bindAnchors({
        rules: [
            {
                condition: [
                    new RegExp(siteDir + "company/personal/user/[0-9]+/($|\\?)", "i"),
                    new RegExp(siteDir + "contacts/personal/user/[0-9]+/($|\\?)", "i")
                ],
                options: {
                    contentClassName: "bitrix24-profile-slider-content",
                    loader: "intranet:profile",
                    width: 414,
                    label: {
                        color: "#FFFFFF", //цвет текста
                        bgColor: color, //цвет фона
                    }
                }
            },
        ]
    });

    var idUserSlider=function (str){
        const regex = new RegExp("/company/personal/user/([0-9]+)/($|\\\\?)", 'i');
        const subst = `$1`;
        const result = str.replace(regex, subst);
        return result
    }

    BX.addCustomEvent("SidePanel.Slider:onOpen", function(event) {
        event.getSlider().width=820;
        // BX.message('USER_ID') == idUserSlider(event.getSlider().url) ? event.getSlider().width=820:event.getSlider().width=820;
    });


})();





/* End */
;
; /* Start:"a:4:{s:4:"full";s:62:"/bitrix/templates/betboom/other/slick/slick.js?166851433288955";s:6:"source";s:46:"/bitrix/templates/betboom/other/slick/slick.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if ( !_.paused && !_.interrupted && !_.focussed ) {

            if ( _.options.infinite === false ) {

                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }

                else if ( _.direction === 0 ) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler( slideTo );

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 0) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

            if (_.options.accessibility === true) {
                _.$dots.off('keydown.slick', _.keyHandler);
            }
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
            }
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }
        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick', '*', function(event) {

            event.stopImmediatePropagation();
            var $sf = $(this);

            setTimeout(function() {

                if( _.options.pauseOnFocus ) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }

            }, 0);

        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                 ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                coef = -1

                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2
                    }
                }
                verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this,
                numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
                tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
                    return (val >= 0) && (val < _.slideCount);
                });

        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                    'role': 'tabpanel',
                    'id': 'slick-slide' + _.instanceUid + i,
                    'tabindex': -1
                });

                if (slideControlIndex !== -1) {
                   var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex
                   if ($('#' + ariaButtonControl).length) {
                     $(this).attr({
                         'aria-describedby': ariaButtonControl
                     });
                   }
                }
            });

            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                var mappedSlideIndex = tabControlIndexes[i];

                $(this).attr({
                    'role': 'presentation'
                });

                $(this).find('button').first().attr({
                    'role': 'tab',
                    'id': 'slick-slide-control' + _.instanceUid + i,
                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                    'aria-label': (i + 1) + ' of ' + numDotGroups,
                    'aria-selected': null,
                    'tabindex': '-1'
                });

            }).eq(_.currentSlide).find('button').attr({
                'aria-selected': 'true',
                'tabindex': '0'
            }).end();
        }

        for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
          if (_.options.focusOnChange) {
            _.$slides.eq(i).attr({'tabindex': '0'});
          } else {
            _.$slides.eq(i).removeAttr('tabindex');
          }
        }

        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'previous'
               }, _.changeSlide);
            _.$nextArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'next'
               }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow.on('keydown.slick', _.keyHandler);
                _.$nextArrow.on('keydown.slick', _.keyHandler);
            }
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$dots.on('keydown.slick', _.keyHandler);
            }
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if ( _.options.pauseOnHover ) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(_.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({ opacity: 0 }, 100, function() {

                            if (imageSrcSet) {
                                image
                                    .attr('srcset', imageSrcSet );

                                if (imageSizes) {
                                    image
                                        .attr('sizes', imageSizes );
                                }
                            }

                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy data-srcset data-sizes')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');

            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if( !_.unslicked ) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }

            _.swipeLeft = null;

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();

                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function( tryCount ) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ( $imgsToLoad.length ) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                if (imageSrcSet) {
                    image
                        .attr('srcset', imageSrcSet );

                    if (imageSizes) {
                        image
                            .attr('sizes', imageSizes );
                    }
                }

                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy data-srcset data-sizes')
                    .removeClass('slick-loading');

                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );

                } else {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [ _ ]);

        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
    Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this, l, item, option, value, refresh = false, type;

        if( $.type( arguments[0] ) === 'object' ) {

            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';

        } else if ( $.type( arguments[0] ) === 'string' ) {

            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                type = 'responsive';

            } else if ( typeof arguments[1] !== 'undefined' ) {

                type = 'single';

            }

        }

        if ( type === 'single' ) {

            _.options[option] = value;


        } else if ( type === 'multiple' ) {

            $.each( option , function( opt, val ) {

                _.options[opt] = val;

            });


        } else if ( type === 'responsive' ) {

            for ( item in value ) {

                if( $.type( _.options.responsive ) !== 'array' ) {

                    _.options.responsive = [ value[item] ];

                } else {

                    l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                            _.options.responsive.splice(l,1);

                        }

                        l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

            _.unload();
            _.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                    _.$slides
                        .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.slideHandler(index, false, true);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if ( _.options.asNavFor ) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.swiping = false;

        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }

        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

        if ( _.touchObject.curX === undefined ) {
            return false;
        }

        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }

        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

            direction = _.swipeDirection();

            switch ( direction ) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                            _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                            _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:


            }

            if( direction != 'vertical' ) {

                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);

            }

        } else {

            if ( _.touchObject.startX !== _.touchObject.curX ) {

                _.slideHandler( _.currentSlide );
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        verticalSwipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = _.swipeDirection();

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                    .removeClass('slick-active')
                    .end();

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if ( _.options.autoplay ) {

            if ( document[_.hidden] ) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));

/* End */
;; /* /bitrix/components/bitrix/search.title/script.min.js?15961072836443*/
; /* /bitrix/templates/betboom/components/bitrix/search.title/betboom_search_title/script.js?167135489450293*/
; /* /bitrix/templates/betboom/components/ndx/change.theme/template1/script.js?1702988602709*/
; /* /bitrix/components/bitrix/tasks.iframe.popup/templates/.default/logic.min.js?15961073737131*/
; /* /bitrix/components/ndx/notification.header/templates/.default/script.js?16686120017829*/
; /* /bitrix/components/ndx/birthday/templates/.default/script.js?16686120017829*/
; /* /bitrix/templates/betboom/bitrix24.js?166255828731542*/
; /* /bitrix/templates/betboom/main.js?17053092065958*/
; /* /bitrix/templates/betboom/other/slick/slick.js?166851433288955*/

//# sourceMappingURL=template_1e08d9cefdc5aa0506b51c155e51899d.map.js