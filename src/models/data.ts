const roles = [
  {
    key: "ROLE_ADMIN",
    name: "Administrator",
    acl: [
      {
        resources: [
          "/v1/boat"
        ],
        permissions: ["post", "put", "patch", "delete"]
      },
      {
        resources: [
          "/v1/decks",
          "/v1/security-levels",
          "/v1/alarmpaths",
          "/v1/cameras",
          "/v1/decksensors",
          "/v1/doors",
          "/v1/eventlogs",
          "/v1/files",
          "/v1/files/tags",
          "/v1/users",
          "/v1/roles",
          "/v1/permissions"
        ],
        permissions: ["post"]
      },
      {
        resources: [
          "/v1/decks/:id",
          "/v1/security-levels/:id",
          "/v1/alarmpaths/:id",
          "/v1/cameras/:id",
          "/v1/decksensors/:id",
          "/v1/doors/:id",
          "/v1/files/:id",
          "/v1/users/:id",
          "/v1/roles/:id",
          "/v1/permissions/:id"
        ],
        permissions: ["put", "patch", "delete"]
      },
      {
        resources: [
          "/v1/boat/system-status",
          "/v1/users/change-password",
          "/v1/users/enable/:id",
          "/v1/users/disable/:id",
        ],
        permissions: ["put"]
      },
      {
        resources: [
          "/v1/eventlogs/:id",
          "/v1/files/tags",
        ],
        permissions: ["delete"]
      }
    ]
  },
  {

    key: "ROLE_MEMBER",
    name: "Member",
    acl: [
      {
        resources: [
          "/v1/boat",
          "/v1/decks",
          "/v1/decks/:id",
          "/v1/security-levels",
          "/v1/alarmpaths",
          "/v1/alarmpaths/:id",
          "/v1/services",
          "/v1/services/:name",
          "/v1/roles",
          "/v1/roles/:id",
          "/v1/users",
          "/v1/users/profile",
          "/v1/permissions",
          "/v1/permissions/:id",
          "/v1/cameras",
          "/v1/cameras/:id",
          "/v1/decksensors",
          "/v1/decksensors/:id",
          "/v1/doors",
          "/v1/doors/:id",
          "/v1/eventlogs",
          "/v1/eventlogs/:id",
          "/v1/files",
          "/v1/files/:id",
        ],
        permissions: ["get"]
      },
      {
        resources: [
          "/v1/alarmpaths/search",
          "/v1/users/search",
          "/v1/cameras/search",
          "/v1/decksensors/search",
          "/v1/doors/search",
          "/v1/eventlogs/search",
          "/v1/files/search",
        ],
        permissions: ["post"]
      }
    ]
  }
];

const userStatus = ['in', 'out', 'onLeave'];

const guestStatus = ['in', 'out'];

const httpMethods = ["get", "post", "put", "patch", "delete"];

export  { roles, userStatus, guestStatus, httpMethods }