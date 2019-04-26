'use strict';

module.exports = () => `
<script type="text/javascript">
(function(name,path,ctx){ctx[name]=ctx[name]||{ready:function(fn){var h=document.getElementsByTagName('head')[0],s=document.createElement('script'),w=window,loaded;s.onload=s.onerror=s.onreadystatechange=function(){if((s.readyState&&!(/^c|loade/.test(s.readyState)))||loaded){return}s.onload=s.onreadystatechange=null;loaded=1;ctx[name].ready(fn)};s.async=1;s.src=path;h.parentNode.insertBefore(s,h)}}})
  ('KeenTracking', 'https://cdn.jsdelivr.net/npm/keen-tracking@4/dist/keen-tracking.min.js', this);

  KeenTracking.ready(function(){
    const client = new KeenTracking({
      projectId: '5cc33f10c9e77c0001221a8b',
      writeKey: '7A9D6C3CC0D72CF31D7F0CEAD56C9754334C36E35C80678A6C75DA8098AB6299309EDD1957063CB8F97E3FFF296E38B6492C83BC347BAAB05A44CA7169F9206BCB4815E76B79869C21C8106F9A1B5FCDE2BBE1AC8DDBB05FB1D500F1FA538DA7'
    });

    client.recordEvent('pageView', {
      path: window.location.pathname
    });
  });
</script>
`;