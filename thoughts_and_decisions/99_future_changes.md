- While developing the API I had the idea that it would be nice to check the environment configuration while starting up, so we can make sure required things which are needed to make the API run (like database access) are actually defined when booting up this node service. NPM packages like "env-schema" could be used for that purpose.

- I thought about the total field and ideally it should not be something the client can update but rather something which gets calculcated on update, since it seems to be the sum of the other numeric statistics of the Pokémon.

- I was not that happy with my inteface approach for editing the Pokémon, so in the future I would like to try out something like react-hook-form and one <form>-element instead of having each field on its own.