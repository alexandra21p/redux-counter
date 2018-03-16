const { createStore, applyMiddleware, compose } = Redux;

const counterReducer = ( state = 0, action ) => {
    switch ( action.type ) {
        case "INCREMENT":
            return state + 1;
            break;
        case "DECREMENT":
            return state - 1;
            break;
        default:
            return state;
    }
};

const logger = store => dispatch => action => {
    console.log( "dispatching:", action );
    let result = dispatch( action );
    console.log( "next state:", store.getState() );
    return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( counterReducer, composeEnhancers( applyMiddleware( logger ) ) );

const displayValue = () => {
    document.querySelector( ".counter-value" ).innerHTML = store.getState();
};

store.subscribe( displayValue );
render();

const handleIncrementClick = () => { store.dispatch( { type: "INCREMENT" } ); };
const handleDecrementClick = () => { store.dispatch( { type: "DECREMENT" } ); };

document.querySelector( ".increment" ).addEventListener( "click", handleIncrementClick );
document.querySelector( ".decrement" ).addEventListener( "click", handleDecrementClick );
