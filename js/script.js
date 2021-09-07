const FormStyler = function(options) {

    this.selector = document.querySelector(options.selector);
    this.countItems = options.countItems;

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

    this.changeHeight = function (countItems) {
        let listItem = this.selector.nextSibling.querySelector('.list-wrapper ul li');
        let listItemsCounts = this.selector.nextSibling.querySelectorAll('.list-wrapper ul li').length;
        if (listItemsCounts > countItems) {
            let newSelect = this.selector.nextSibling.querySelector('.list-wrapper ul');
            newSelect.style.maxHeight = countItems * listItem.offsetHeight + 'px';
            newSelect.style.overflowY = 'scroll';
        }
    }

    this.clickOnTitle = function () {
        let title = this.selector.nextSibling.querySelector('.title');
        title.addEventListener('click',  (event) => {
            event.stopPropagation();
            this.selector.nextSibling.classList.toggle('opened');
            this.changeHeight(this.countItems);
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
