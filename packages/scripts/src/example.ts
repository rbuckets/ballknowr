import { Resource } from "sst";
import { Example } from "@ballknowr/core/example";

console.log(`${Example.hello()} Linked to ${Resource.MyBucket.name}.`);
