/*
------------------------------------------------------------------------------
 ---=== DEPRECATED ===---  ---=== DEPRECATED ===---  ---=== DEPRECATED ===---
------------------------------------------------------------------------------
*/
(function(attachTo) {
    
    
    function ObjectManager() {
        var that = this;
        
        that.hasChanged = false;
        
        that.objects = {
            background: [],
            middleground: [],
            foreground: []
        };
        
        that.cachedObjects = [];
    }
    
    
    ObjectManager.prototype.addObject = function(type, object) {
        var that = this;
        
        that.objects[type].push(object);
        that.prepareObjects();
    };
    
    
    ObjectManager.prototype.removeObject = function(type, object) {
        var that = this,
            objs = that.objects[type],
            i = objs.length - 1;
            
        do {
            if(objs[i] === object) {
                objs.splice(i, 1);
                break;
            }
        }
        while(--i);
        
        that.prepareObjects();
    };
    
    
    ObjectManager.prototype.sortFunction = function(a, b) {
        return a.zIndex - b.zIndex;
    };
    
    
    ObjectManager.prototype.prepareObjects = function() {
        var that = this,
            objs = that.objects,
            sort = that.sortFunction,
            bg = objs.background,
            mg = objs.middleground,
            fg = objs.foreground;
        
        // Reset the cached objects array
        that.cachedObjects.length = 0;
		
        // Sort the objects and concat them into cachedObjects.        
        bg.sort(sort);
        that.cachedObjects = that.cachedObjects.concat(bg);

        mg.sort(sort);
        that.cachedObjects = that.cachedObjects.concat(mg);

        fg.sort(sort);
        that.cachedObjects = that.cachedObjects.concat(fg);
    };
    
    
    ObjectManager.prototype.getObjects = function() {
        return this.cachedObjects;
    };
    
    
    
    attachTo.ObjectManager = ObjectManager;
    
}(window));