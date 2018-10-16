
# zenox-config
Library to load configuration data from YAML files depending of NODE_ENV value.


### Default config from YAML files
Default config service that loads config from YAML files with path of one of next options:

- ZENOX_CONFIG_DIR env variable.
- ZENOX_PROJECT_DIR env variable plus "config" child. 
- Current working directory plus "config" child.

###### Usage
```typescript
import {Config} from '@zenox/config';

let port = Config.get('http.port');
```


### Custom config from object literal
Custom config service that loads config from object literal. 

###### Usage
```typescript
import {ConfigService} from '@zenox/config';

let config = new ConfigService({http: {port: 3000}});
let port = config.get('http.port');
```


### Custom config from YAML files
Custom config service that loads config from path of directory with YAML files.

###### Usage
```typescript
import {ConfigService} from '@zenox/config';

let path = '<relative path to config dir>';
let config = ConfigService.fromYaml(path);
let port = config.get('http.port');
```
