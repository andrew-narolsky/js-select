const FormStyler = function(options) {

    this.selector = document.querySelector(options.selector);

    this.init = function () {
        this.selector.style.display = 'none';
        let lists = '';
        let title = '';
        let options = this.selector.querySelectorAll('option');
        for (let option in options) {
            if (options.hasOwnProperty(option)) {
                if (option === '0') {
                    title = options[option].innerText;
                }
                lists += '<li data-id="' + options[option].value + '">' + options[option].innerText + '</li>';
            }
        }
        this.selector.insertAdjacentHTML('afterend', '<div class="swf-list">' +
            '<div class="title">' + title + '</div>' +
            '<div class="list-wrapper">' +
            '<ul>' + lists + '</ul>' +
            '</div>' +
            '</div>');
        this.clickOnTitle();
        this.selectOption();
        this.closeOnBody();
    }

    this.clickOnTitle = function () {
        let title = this.selector.nextSibling.querySelector('.title');
        title.addEventListener('click',  (event) => {
            event.stopPropagation();
            this.selector.nextSibling.classList.toggle('opened');
        });
    }

    this.selectOption = function () {
        let title = this.selector.nextSibling.querySelector('.title');
        let lists = this.selector.nextSibling.querySelectorAll('.list-wrapper ul li');
        let select = this.selector;
        for (let li in lists) {
            if (lists.hasOwnProperty(li)) {
                lists[li].addEventListener('click',  function () {
                    let id = lists[li].getAttribute('data-id');
                    title.innerText = lists[li].innerText;
                    select.value = id;
                    select.nextSibling.classList.remove('opened');
                });
            }
        }
    }

    this.closeOnBody = function () {
        let body = document.querySelector('body');
        body.addEventListener('click',  () => {
            this.selector.nextSibling.classList.remove('opened');
        });
    }
}
