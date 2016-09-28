var Tag = (function() {
    var input = document.querySelector('.tags-container input[type="text"]');
    var container = document.getElementsByClassName("tags-container")[0];
    var tags = [];

    var _localStorageExist = function() {
        var itemName = 'test';
        try {
            localStorage.setItem(itemName, 'test');
            localStorage.removeItem(itemName);
            return true;
        } catch(e) {
            return false;
        }
    };

    var _loadTags = function() {
        if(_localStorageExist) {
            tags = JSON.parse(localStorage.getItem("tags")) || ["example"];
        } else {
            tags = ["example"];
        }
    };

    var _saveTags = function() {
        if(_localStorageExist) {
            localStorage.setItem("tags", JSON.stringify(tags));
        }
    };

    var _createTag = function(value) {
        var tag = document.createElement("div");
        tag.classList.add("tag");

        var name = document.createElement("span");
        name.textContent = value;

        var removeBtn = document.createElement("button");
        removeBtn.textContent = "x";
        removeBtn.classList.add("remove");

        tag.appendChild(name);
        tag.appendChild(removeBtn);
        container.insertBefore(tag, input);

        _handleUserRemove(removeBtn);
    };

    var _handleUserRemove = function(e) {
        e.addEventListener("click", function() {
            var parent = this.parentNode;
            var tag = parent.firstChild.textContent;
            parent.parentNode.removeChild(parent);
            tags.splice(tags.indexOf(tag), 1);
            _saveTags();
        });
    };

    var _tagExist = function(value) {
        return tags.indexOf(value) === -1 ? false : true;
    };

    var _getValue = function() {
        var value = input.value.trim();
        var arr = [];
        if(value != "") {
            arr = value.split(",");
            arr.forEach(function(x) {
                x = x.trim();
                if(x != "" && !_tagExist(x)) {
                    _createTag(x);
                    tags.push(x);
                    _saveTags();
                }
            });
        }
        input.value = "";
    };

    var _update = function() {
        tags.forEach(function(value) {
            _createTag(value);
        });
    };

    var _bindEvents = function() {
        input.addEventListener("keydown", function(e) {
            if(e.keyCode == 13) {
                _getValue();
            }
        });
    };

    var _init = function() {
        _loadTags();
        _bindEvents();
        _update();
    }

    return {
        init: _init
    };
})();

Tag.init();


