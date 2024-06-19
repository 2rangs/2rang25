<template>

  <div v-if="useColorMode().preference == 'light'" id="comments">
    <Script src="https://utteranc.es/client.js"
            repo="2rangs/blog-comments"
            issue-term="url"
            theme="github-light"
            crossorigin="anonymous"
            async>
    </Script>
  </div>
  <div v-else id="comments">
    <Script src="https://utteranc.es/client.js"
            repo="2rangs/blog-comments"
            issue-term="url"
            theme="github-dark"
            crossorigin="anonymous"
            async>
    </Script>
  </div>
</template>
