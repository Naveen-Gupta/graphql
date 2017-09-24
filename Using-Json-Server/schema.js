const axios = require('axios');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

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
                return axios.get(`http://localhost:3000/cricketers/${args.id}`)
                    .then(res => res.data);
            }
        },
        cricketers:{
            type: new GraphQLList(CricketerType),
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/cricketers`)
                    .then(res => res.data);
            }
        }
    })
});

// Mutation: adding a cricketer, deleting a cricketer, updating a cricketer details
const mutation = new GraphQLObjectType({
    name:'Mutation',
    description: '...',
    fields: {
        addCricketer:{
            type: CricketerType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
                profession: {type: GraphQLString}
            },
            resolve(parentValue, args){
                return axios.post(`http://localhost:3000/cricketers`,{
                    name: args.name,
                    age: args.age,
                    profession: "Cricketer"
                })
                .then(res=> res.data);
            }   
        },
        deleteCricketer:{
            type: CricketerType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return axios.delete(`http://localhost:3000/cricketers/${args.id}`)
                .then(res=> res.data);
            }   
        },
        editCricketer:{            
            type: CricketerType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                profession:{type: GraphQLString}
            },
            resolve(parentValue, args){
                return axios.patch(`http://localhost:3000/cricketers/${args.id}`, args)
                .then(res=> res.data);
            }   
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation
});