Using Bootstrap, Vue, and Popper.js, you can make a more modern dropdown as
opposed to the `<select>` tag in HTML.

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous"/>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
<script src="https://unpkg.com/vue@next"></script>
<div id="example">
</div>
<script>
Vue.createApp({
  template: `
 <div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
    <li v-for="option in options" :key="option"><a class="dropdown-item">{{option}}</a></li>
  </ul>
</div>
  `,
  data() {
    return {
        options: [
        'Action 1',
        'Action 2',
        'Action 3',
        'Action 4'
        ]
    };
  }
}).mount('#example');
</script>

Popper.js is already loaded in the cdn Bootstrap file so you should not
have to import it although you could provided you put it before the
Bootstrap import.
Here is the code to make a simple dropdown with Bootstrap and Vue:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous"/>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
<script src="https://unpkg.com/vue@next"></script>
<div id="example">
</div>
<script>
Vue.createApp({
  template: `
 <div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
    <li v-for="option in options" :key="option"><a class="dropdown-item">{{option}}</a></li>
  </ul>
</div>
  `,
  data() {
    return {
        options: [
        'Action 1',
        'Action 2',
        'Action 3',
        'Action 4'
        ]
    };
  }
}).mount('#example');
</script>
```
