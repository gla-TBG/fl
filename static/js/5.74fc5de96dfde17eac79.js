webpackJsonp([5],{"7Y/d":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("L9TO"),i=(s("3f40"),s("4qOc"),s("+cgv"),s("G0J2")),a=s("GH0r");i.Quill.register("modules/ImageExtend",a.a);var o=[["bold","italic","underline","strike"],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{font:[]}],[{align:[]}],["link","image"],["clean"]],c={components:{quillEditor:i.quillEditor},data:function(){return{editorOption:{modules:{ImageExtend:{loading:!0,name:"file",action:"http://47.105.184.58:8080/qs-one-0.0.1-SNAPSHOT/api/web/uploadfile",response:function(t){return t.data.url},start:function(){},end:function(){},change:function(t,e){}},toolbar:{container:o,handlers:{image:function(){a.b.emit(this.quill.id)}}}}},id:"",newsInfo:"",commentList:[],ReccomendList:[],comment_content:""}},methods:{loseFocus:function(){this.$refs.myQuillEditor1.$el.children[1].classList.remove("ql-container-focus"),this.$refs.myQuillEditor1.$el.children[1].classList.add("ql-container")},getFocus:function(){this.$refs.myQuillEditor1.$el.children[1].classList.add("ql-container-focus")},getNewsInfo:function(){var t=this;this.id=this.$route.params.id,Object(n.c)(this.id).then(function(e){t.newsInfo=e.data.data.new,t.commentList=e.data.data.commentList})},toDetail:function(t){var e=this;Object(n.c)(t).then(function(t){e.newsInfo=t.data.data.new,e.commentList=t.data.data.commentList})},backTo:function(){this.$router.back(-1)},getReccomendList:function(){var t=this;Object(n.d)().then(function(e){t.ReccomendList=e.data.data})},submitComment:function(){var t=this;this.$store.state.loginStatus?this.comment_content?Object(n.j)(this.comment_content,this.id,this.$store.state.loginStatus).then(function(e){2e4===e.data.code&&(t.comment_content="",t.$Message.success("评论成功"),t.getNewsInfo())}):this.$Message.warning("评论内容不能为空"):this.$Message.warning("请先登陆")}},activated:function(){this.getNewsInfo(),this.getReccomendList()},created:function(){null==this.id&&this.$router.push({name:"/home"})}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"detail-wrap"},[s("div",{staticClass:"index-left",staticStyle:{"margin-top":"90px"}},[s("div",{staticClass:"new"},[s("div",{staticClass:"new-block"},[s("div",{staticClass:"back-icon"},[s("Icon",{attrs:{size:"30",type:"md-arrow-back"},on:{click:t.backTo}})],1),t._v(" "),s("div",{staticClass:"detail-title"},[t._v("\n          "+t._s(t.newsInfo.title)+"\n        ")]),t._v(" "),s("div",{staticClass:"detail-content"},[s("div",{staticClass:"detail-des"},[t._v("\n            作者："+t._s(t.newsInfo.user.username)+" / "+t._s(t.newsInfo.createTime)+"\n            "),0===t.newsInfo.newstypeId?s("span",{staticClass:"category"},[t._v("\n              公告\n            ")]):t._e(),t._v(" "),1===t.newsInfo.newstypeId?s("span",{staticClass:"category"},[t._v("\n              社会\n            ")]):t._e(),t._v(" "),2===t.newsInfo.newstypeId?s("span",{staticClass:"category"},[t._v("\n              体育\n            ")]):t._e(),t._v(" "),3===t.newsInfo.newstypeId?s("span",{staticClass:"category"},[t._v("\n              财经\n            ")]):t._e(),t._v(" "),4===t.newsInfo.newstypeId?s("span",{staticClass:"category"},[t._v("\n              科技\n            ")]):t._e()]),t._v(" "),t.newsInfo.newsPhoto?s("div",{staticClass:"detail-img"},[s("img",{attrs:{width:"740px",height:"530px",src:t.newsInfo.newsPhoto}})]):t._e(),t._v(" "),s("div",{staticClass:"detail-txt",domProps:{innerHTML:t._s(t.newsInfo.content)}})])]),t._v(" "),s("div",{staticClass:"comment-block"},[s("div",{staticClass:"header"},[t._v("\n          评论区\n        ")]),t._v(" "),t.commentList.length>0?s("div",{staticClass:"view"},t._l(t.commentList,function(e,n){return s("div",{key:n,staticClass:"comment-item"},[s("div",{staticClass:"view-user"},[s("img",{staticClass:"user-img",attrs:{src:e.user.userPhoto}}),t._v(" "),s("div",[t._v("\n                "+t._s(e.user.username)+"\n              ")])]),t._v(" "),s("div",{staticClass:"view-content"},[s("div",{staticClass:"create-time"},[t._v("\n                "+t._s(e.createTime)+"\n              ")]),t._v(" "),s("div",{staticClass:"comment-txt",domProps:{innerHTML:t._s(e.content)}})])])})):s("div",{staticClass:"view",staticStyle:{"font-size":"16px"}},[t._v("还没有人评论过...")]),t._v(" "),s("div",{staticClass:"rating"},[s("quill-editor",{ref:"myQuillEditor1",staticStyle:{"max-width":"650px","margin-top":"15px","margin-left":"40px",background:"#fff"},attrs:{options:t.editorOption,placeholder:"我来评论两句..."},on:{focus:t.getFocus,blur:t.loseFocus},model:{value:t.comment_content,callback:function(e){t.comment_content=e},expression:"comment_content"}}),t._v(" "),s("button",{staticClass:"btn-rating",on:{click:t.submitComment}},[t._v("发表评论")])],1)])]),t._v(" "),s("div",{staticClass:"news-recommend"},[s("div",{staticClass:"block-head"},[t._v("\n        相关推荐\n      ")]),t._v(" "),t._l(t.ReccomendList,function(e,n){return s("div",{key:n,staticClass:"Rnew-list"},[s("div",{staticClass:"Rnew-item",on:{click:function(s){t.toDetail(e.id)}}},[s("img",{attrs:{width:"280",height:"150px",src:e.newsPhoto}}),t._v(" "),s("div",{staticClass:"Rnew-title"},[t._v("\n            "+t._s(e.title)+"\n          ")])])])})],2),t._v(" "),s("BackTop")],1)])},staticRenderFns:[]};var d=s("VU/8")(c,l,!1,function(t){s("Dq1v")},null,null);e.default=d.exports},Dq1v:function(t,e){}});
//# sourceMappingURL=5.74fc5de96dfde17eac79.js.map