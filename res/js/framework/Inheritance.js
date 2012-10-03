(function(attachTo) {
    
    // Shared constructor function. Used by inherit().
	var Ctor = function() {},
	
	    // Cached slice function
	    slice = Array.prototype.slice;
	
	/**
	*	Straight-forward copy of properties from one object to another.
	*	@param {Object} to The Object to copy to.
	*	@param {Object} from The Object to copy from.
	*	@returns {Object} to The `to` argument with properties from `from`.
	*/
	var shallowCopy = function(to, from) {
		for(var i in from) {
			to[i] = from[i];
		}
	};

	
	/**
	*	Classical inheritance emulation.
	*
	*	@param {Object} parent The parent object to inherit from
	*	@param {Object} protoProps A map of properties to apply to the child's prototype
	*	@param {Object} classProps A map of properties to apply to the child
	*
	*	@returns {Object} child The new subclass.
	*/
	var inherit = function(parent, protoProps, classProps) {
		
		// Create the new child function
		var child = function() {
			return parent.apply(this, slice.call(arguments));
		};
		
		// Inherit static (class) properties from the parent
		shallowCopy(child, parent);
		
		// Inherit parent's prototype chain without invoking the parent's
		// constructor
		Ctor.prototype = parent.prototype;
		child.prototype = new Ctor();
		
		// Apply any prototype properties to child's prototype
		if(protoProps) {
			shallowCopy(child.prototype, protoProps);
		}
		
		// Apply any class properties to the child
		if(classProps) {
			shallowCopy(child, classProps);
		}
		
		// Store a reference to the parent class in case it's needed later.
		child._super = parent;
		
		return child;
	};
	
	
	/**
	*	Self-propagating extension function. Delegates to `inherit` for the
	*	actual inheritance. Called with scope of parent that is to be extended.
	*
	*	@param {Object} protoProps A map of properties to apply to the child's prototype.
	*	@param {Object} classProps A map of properties to apply to the child directly.
	*
	*	@returns {Object} child The new subclass
	*/
	var extend = function(protoProps, classProps) {
		var child = inherit(this, protoProps, classProps);
		child.extend = this.extend;
		return child;
	};
    
    
    attachTo.Inheritance = {
        inherit: inherit,
        extend: extend
    };
    
}(window));