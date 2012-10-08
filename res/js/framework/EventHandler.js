
(function(attachTo) {
    
    var _split = ' ';
    
    function EventHandler() {}
    
    EventHandler.prototype = {
        
        _store: {},
        
        setSplitter: function(splitter) {
            _split = splitter;
        },
        
        _getNames: function(names) {
            return names.split( _split );
        },
        
        _loopNames: function(names, iterator) {
            this._getNames(names).forEach(iterator);
        },
        
        on: function(names, fn, scope) {
            var store = this._store;
            
            this._loopNames(names, function(name) {
                store[name] = {
                    fn: fn,
                    scope: scope
                };
            });
        },
        
        off: function(names, fn, scope) {
            var that = this,
                store = this._store;
                
            that._loopNames(names, function(name) {
                delete store[name];
            });
        },
        
        fire: function(names, scope) {
            var args = Array.prototype.slice.call(arguments).splice(2),
                store = this._store,
                ev;
            
            this._loopNames(names, function(name) {
                ev = store[name];
                if(ev) { 
                    ev.fn.apply(scope || ev.scope || this, args);
                }
            });
        }
    };
    
    
    
    attachTo.EventHandler = EventHandler;
    
    
}(window));