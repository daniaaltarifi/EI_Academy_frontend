"use strict";(self.webpackChunknaja=self.webpackChunknaja||[]).push([[786],{4786:(c,e,s)=>{s.r(e),s.d(e,{default:()=>r});var a=s(5043),l=s(9023),n=s(4122),t=s(6213),i=s(3216),o=s(2064),A=s(579);const r=function(){const[c,e]=(0,a.useState)([]);(0,a.useEffect)((()=>{window.scrollTo(0,0),(async()=>{try{const c=(await t.A.get("".concat(o.H,"/contactdynamic/"))).data;e(c)}catch(c){console.error("Failed to fetch slider:",c)}})()}),[]);const[r,m]=(0,a.useState)([]),{hash:d}=((0,i.zy)().pathname,(0,i.zy)());return(0,a.useEffect)((()=>{if(d){const c=document.querySelector(d);c&&c.scrollIntoView({behavior:"smooth"})}}),[d]),(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(l.A,{slider:r}),(0,A.jsx)("section",{className:"margin_section",children:(0,A.jsx)("div",{className:"container text-center ",id:"order-section",children:(0,A.jsxs)("div",{className:"row cont_contact",children:[c.map((c=>(0,A.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[(0,A.jsx)("h1",{className:"faq",children:c.title}),(0,A.jsx)("p",{className:"desc_contac",children:c.descr}),(0,A.jsxs)("div",{className:"row",children:[(0,A.jsx)("div",{className:"col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center",children:(0,A.jsxs)("div",{className:"d-flex ",children:[(0,A.jsx)("div",{className:"icon_cont_contact",children:(0,A.jsx)("img",{src:s(2978),alt:"phone",className:"img-fluid icon_contact",loading:"lazy"})}),(0,A.jsx)("div",{children:(0,A.jsx)("p",{className:"contact_info",children:c.phone})})]})}),(0,A.jsx)("div",{className:"col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center",children:(0,A.jsxs)("div",{className:"d-flex ",children:[(0,A.jsx)("div",{className:"icon_cont_contact",children:(0,A.jsx)("img",{src:s(650),alt:"phone",className:"img-fluid icon_contact",loading:"lazy"})}),(0,A.jsx)("div",{className:"contact_info",children:(0,A.jsx)("a",{href:c.whatsup,target:"blank",className:"contact_info",children:"\u0628\u0635\u0645\u0629 \u0648\u0627\u062a\u0633\u0627\u0628"})})]})}),(0,A.jsx)("div",{className:"col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center",children:(0,A.jsxs)("div",{className:"d-flex ",children:[(0,A.jsx)("div",{className:"icon_cont_contact",children:(0,A.jsx)("img",{src:s(5260),alt:"phone",className:"img-fluid icon_contact",loading:"lazy"})}),(0,A.jsx)("div",{className:"contact_info",children:(0,A.jsx)("a",{href:c.facebook,target:"blank",className:"contact_info",children:"\u0628\u0635\u0645\u0629 \u0627\u0648\u0646\u0644\u0627\u064a\u0646"})})]})}),(0,A.jsx)("div",{className:"col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center email_cont",children:(0,A.jsxs)("div",{className:"d-flex justify-content-center align-items-center",children:[(0,A.jsx)("div",{className:"icon_cont_contact",children:(0,A.jsx)("img",{src:s(5738),alt:"phone",className:"img-fluid icon_contact",loading:"lazy"})}),(0,A.jsx)("div",{children:(0,A.jsx)("p",{className:"contact_info",children:c.email})})]})})]})]},c.id))),(0,A.jsx)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:(0,A.jsx)("iframe",{src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3386.2206410015024!2d35.90986842377241!3d31.92776652690021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca0a3af3acf8b%3A0xfaeba9dd7981de41!2z2KPZg9in2K_ZitmF2YrYqSDYt9ix2YrZgiDYp9mE2YbYrNin2K0!5e0!3m2!1sar!2sjo!4v1721133493463!5m2!1sar!2sjo",className:"location_maps_contact",allowfullscreen:"",loading:"lazy",referrerpolicy:"no-referrer-when-downgrade"})})]})})}),(0,A.jsx)("div",{className:"container",children:(0,A.jsxs)("div",{className:"row",children:[(0,A.jsx)("div",{className:"col-lg-3 col-md-12 col-sm-12 "}),(0,A.jsx)("div",{className:"col-lg-6 col-md-12 col-sm-12 ",children:(0,A.jsx)(n.A,{title:"\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627",btn_title:"\u0627\u0631\u0633\u0627\u0644",handleSubmit:async(c,e,s)=>{try{await t.A.post("".concat(o.H,"/Comments/addComment"),{name:c,email:e,comment:s})}catch(a){console.error("Error submitting comment:",a)}}})}),(0,A.jsx)("div",{className:"col-lg-3 col-md-12 col-sm-12 "})]})})]})}},4122:(c,e,s)=>{s.d(e,{A:()=>n});var a=s(5043),l=s(579);const n=function(c){let{title:e,btn_title:s,handleSubmit:n}=c;const[t,i]=(0,a.useState)(""),[o,A]=(0,a.useState)(""),[r,m]=(0,a.useState)(""),[d,g]=(0,a.useState)(0);return(0,l.jsx)(l.Fragment,{children:(0,l.jsx)("section",{className:"margin_section",children:(0,l.jsx)("div",{className:"container ",children:(0,l.jsx)("div",{className:"row",children:(0,l.jsxs)("div",{className:"col-lg-12 col-md-6 col-sm-12",children:[(0,l.jsx)("h2",{className:"leave_comment_title",children:e}),(0,l.jsxs)("div",{className:"row",children:[(0,l.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[(0,l.jsx)("p",{className:"title_of_comment_form",children:"\u0627\u0644\u0627\u0633\u0645"}),(0,l.jsx)("input",{type:"text",name:"name",value:t,onChange:c=>i(c.target.value),className:"comment_form_input"})]}),(0,l.jsxs)("div",{className:"col-lg-6 col-md-12 col-sm-12",children:[(0,l.jsx)("p",{className:"title_of_comment_form",children:"\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0627\u0644\u0643\u0646\u0631\u0648\u0646\u064a"}),(0,l.jsx)("input",{type:"email",name:"email",value:o,onChange:c=>A(c.target.value),className:"comment_form_input"})]})]}),(0,l.jsx)("div",{className:"row",children:(0,l.jsxs)("div",{className:"col-lg-12 col-md-12 col-sm-12",children:[(0,l.jsx)("p",{className:"title_of_comment_form",children:"\u0627\u0644\u062a\u0639\u0644\u064a\u0642 "}),(0,l.jsx)("input",{type:"textarea",className:"textarea_input_commentForm",value:r,onChange:c=>m(c.target.value)})]})}),(0,l.jsx)("div",{className:"row",children:(0,l.jsxs)("div",{className:"col-lg-12 col-md-12 col-sm-12",children:[(0,l.jsx)("p",{className:"title_of_comment_form",children:"\u0627\u0644\u062a\u0642\u064a\u064a\u0645"}),(0,l.jsx)("div",{className:"rating-input",children:[1,2,3,4,5].map((c=>(0,l.jsx)("i",{className:"fa-star ".concat(c<=d?"fa-solid":"fa-regular"),style:{color:"#F6B40A",cursor:"pointer"},onClick:()=>{g(c)}},c)))})]})}),(0,l.jsx)("div",{className:"row",children:(0,l.jsx)("div",{className:"col d-flex justify-content-center",children:(0,l.jsx)("button",{type:"submit",onClick:async c=>{if(c.preventDefault(),!t||!o||!r||0===d)return void alert("\u0627\u0644\u0631\u062c\u0627\u0621 \u0645\u0644\u0621 \u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0644 \u0648\u062a\u062d\u062f\u064a\u062f \u0627\u0644\u062a\u0642\u064a\u064a\u0645.");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o))try{await n(t,o,r,d),i(""),A(""),m(""),g(0)}catch(e){console.error("Error submitting comment:",e)}else alert("\u0627\u0644\u0631\u062c\u0627\u0621 \u0625\u062f\u062e\u0627\u0644 \u0628\u0631\u064a\u062f \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0635\u062d\u064a\u062d.")},className:"submit_button_commentForm",children:s})})})]})})})})})}},5738:c=>{c.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAgFJREFUSIntlU1rU1EQht+ZOTcJjW50oVRBFy2ouOlSjDY32r+ibiz+FPt3LOQWExFE6FKKWbiwHxG/UFLu18y4aIK1TVolcSO+qwNneB5mzjkc4H9OCQHA/osnt1i1QQSeBdQdZiLdudtPX5K/fjCX5fV5qCYALs9CAOA9ROJqZbDDWVrrWkEZRGIA2zOAb0MktoKyLK11GY4l5rLjmZcwTCvZI+MVy8qUqWjDsTSa+RWKLHHjYgrJHhm31PQ7CxIQLQA4dKiOq1NI+uPgvwpGEtF1i2T/DyR9cm8Vln/hQM8Ow48LAIBogVWTQ5KdU+Gqn0MIbQDXjxZMuveLrJqo2ABELQC7Y2p2QbRcsn8NITwfBz9JcNAMR1RrrG0B2jzSSZ/c79caa1seRAGUkxiTBG9NJGbN62lndcOkMgB0OC76QCT3igp/SjuPkyi382VZtgC8+T2Be89EYi50DpAEwDKrJiaVQRXFzSrya0Wwj6HwNkBNJ2pHIudMZAXuvZMF7j0Locma18HYADA/3Flk1Vc5VR7mFD0KhW8CuDHcu+BE66x5vVS9c7QTSjurfrDCOy84JrYIjATApQnjm5Q+ubdU8e34Q5sePuqkLSxnTRGPxsUgbJqGu1PCf0rYDiQetUDY5GotbXDk1RnAR7nobG2BnanW0sZf/3BmwfvH8wNdNwpEERyEPwAAAABJRU5ErkJggg=="},5260:c=>{c.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAATpJREFUSIntk71KA0EUhc+ZnbhZsNIINgHBwtJCEJEQ8A1s9CFEg5IXEEurgIWVrY0PseAfCCK+gVgFsQiJQtbsz7WKWccNTkzs9nbnzpzzXeYyxAjV8eulgg7rBDYBLAAgBe9CtJWoralq48H0aNvw4GZvEUnPB1hO94VwAcxGiLwsn7IJFwEl4bkZblNWgO7t/hqB1VHDAcsnUoms/2hSDlx4Z6wcv40NADBn6Ndi5aRhNZxVvIhj6LaVzxowRmU+kfg706HWS1+amBdJXSDc3lVtJe0pNJuP3L6IrQBdRy0r4HpANG+wnAD3qUYI4O//4NcSec6afnIA8mnY0aSWPBSQuQMvLt1Bv8z09YfoI5C76UAX4WDJTjEYCcCNwwhAq6+Dy9r3AJGY1dOW6cuqf/8HOSAH5ADgE22gVah8z8bBAAAAAElFTkSuQmCC"},2978:c=>{c.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAiNJREFUSImt1U1IFHEYx/HvM7vtLJRBS4cUipJAervYpVotvERL0CGygi4eAi8qil2DhbqaWRBCnaP01LuHSFo1omtYEEiHDgtBGki4Y7vz66LrOOqUOz2HgXmeh+czDzPM31gKjXekvS3b2pCzG0BmlbJ5z+qyw9+JEUkAb6rnsOczgjiwXDCJpFIPgStxAEfT+ZR8HsPK8CoCOSnvxAK82bnTwMEN6jsWCz+bYgGSvzOqwTc/GwswxyJfomOciAXgJL5ENQj2xwLc44MzJn5s3GJPYgFmyIex9Wcz6LYM3YoFLF1GwwXBBzebuWaGYgOpSuYF6FuwYNh7s7wfZ3gVsLZ8GWxgVcVo00h74r8AAO68hoGv1Yp0pFRffz0uYMGb0kTPGeBVIFXB7Hy6ZehprcCq/0y69c4Y6H4glUB6tFDoPlUrYOGExjvSXnL7JHA0kF7A7HJ4Ewnzpnr6EefMbMb3NeWgd6nWu5+Xv741AMCvQm99wvxJoDGQrghupovFG3ZxtCLlHW9ibgBT75qHhFlgrOws9q0LACy87dpnjvM6hIDZR6QCcCy05ZqQ2dUNgZVNKs/BmqP6IqIz8jDZevJ20S3PZzEe1DJdwo/cIBilya4cOPcQezdh5P4ZANDLbteroxOsH9jzl/ZP7ryaNwVUoZH2hNfQcNakC4IcEDoVNW2WvOS2DE7XBISjNNHXiP1ukpxdBkU3k3ljh/KLAH8AoW66jNQJB0YAAAAASUVORK5CYII="},650:c=>{c.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAA+hJREFUSInFlF2IlGUUx3/nmXHmnRUNrVg3MVDyIpKWcKloZtZEtC5ML0JrwWAvMsqPWbdciDCZtAgWQndnl8ogpYUyLYmERFKXndm1vIg+SKFERVq3kN21ZWnnfdd5n9PFfOw069p01bl5ec45z//3/J/D+wgzhJ5PhrwbN54U1fUKDwMLgDmg14FLIuakau6YE+/+dSYNAJkmrMjkQEuTqr4JLC4rTQDjwN2AKeSsCB9b8XdFot1X/xWgZ1sjbi53UESeySf4SqDHC/tfz32kewRAj2wI3KxbsExF1qmypeDsT1SedRo7Ts4I0N5mxwvecQo0ClxW0eZILJW5nX09uXO2VzO5G2gDrCBN4XjH0VsCvP5EjyqbBM55uVlr5658Z/h24uXhZbY3KdIDeMZqLLQi9X2xZgDczPanVNkEXJ00k+v+izhAOJ76BJU2oMYaOaiaLM4IU1i8nfdjX5oTfe86QDad2ONmEr6bSbRUA3EaO/YBGaDeHRhpKgGy6dFHQR4AGXBiXScAvIHEMhF2FRy+rEc2BKqBqOrrAKKyuQQwhvX503O4mLSWh5iaz73ePXVPVOUinkoDQ0BUz7bOJ39CrQcQa8+UOq29VrZv2JrAj9UARFBVeoGg6+uDBYDUAYQ8ryTq2LvSwJXC8ljNY/uuTVObESKDeWG/rgBgNgDzmCg1rUzmELsVUKB5Ir0tWi1ABQ/AKmEAozACkB0P15Y3OrGuEyqyFwiJmC/LIX+ld9RlM4nn9HwyNM2B6kIACTAEYAz8DBAIBBoqm53ovDcEPhSYb8T0uf0t7e7Z1vuM2C8EPvJGRy9n0y2bK7Y1AGhOL+avSOQ0AMY+Pe00krShWOfzquwFFNU2fP+i5F9XgIUi+kqx3820LgHqgQuRFV1XAEyI8HFExlTZkO3btng6BI00du4WleXAKfJzKYYCqaml/xqAwJFixkisfRzV94EwxrxQCShGuLHjJyfeuRqjS1HdIuirYm29E+/sBijMqBkYDrnu/uK+YOF7Z54mP8wEKIYTTV0C3i3P5a/G/xwIqGqbrD4wVnJQcLoGsN6s3KmS9yqfh2xmx+PgfwvUotoVaUwdKq+L17fjfjX2AnBRVfYYwypVuwoRXy1vOcb5VGLt45XCk5nEcl+1TUQ2AoLK/vAfQztl41H/HwA3sz0B0lGx3065wwX5TrCXFLkJ1OafF1lUqA+K0hZu7DzMLSKImDWoAvyCyBmxnA4FTW/Wt0sD6FaFtaBRRcr+ZvGBfuCzcMT9QBoOTNxKHCAo1h7yfV6sWZkarKidA86pJo33zdgStf4iQYIi+ntowv2tfJD/a/wNio2brqcdFH4AAAAASUVORK5CYII="}}]);
//# sourceMappingURL=786.f0b3e5ce.chunk.js.map