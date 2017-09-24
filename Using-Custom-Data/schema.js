const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql');

// crickers array
const cricketers = [    
    {id:"1", name: "Sachin Tendulkar", age: 40, profession: "Cricketer"},
    {id:"2", name: "Saurav Ganguly", age: 39, profession:"Cricketer"},
    {id:"3", name: "Virendra Sehwag", age: 38, profession: "Cricketer"}
];

// Defining cricketer type 
const CricketerType = new GraphQLObjectType({
    name: 'CricketerType',
    description: '...',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString}
    })
});

// Defining root query type 
// to get cricketer details by providing id and getting all crickers
const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    description: '...',
    fields: () => ({
        cricketer: {
            type: CricketerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args){
                for(let i=0; i<cricketers.length; i++){
                    if(cricketers[i].id === args.id){
                        return cricketers[i];
                    }
                }
            }
        },
        cricketers:{
            type: new GraphQLList(CricketerType),
            resolve(parentValue, args){
                return cricketers;
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQueryType,
});