import { Logger } from '@nestjs/common';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';
import * as fs from 'fs';
import * as nconf from 'nconf';
import * as yaml from 'nconf-yaml';
import { resolve } from 'path';

/* eslint-disable @typescript-eslint/no-var-requires */
const packageMeta = require(resolve(process.cwd(), 'package.json')) || {};

export class ConfigService {
    private readonly envConfig: { [key: string]: any };

    private readonly logger = new Logger(ConfigService.name);

    constructor() {
        const ENV = process.env.NODE_ENV || 'development';
        const configFile = `env.${ENV}.yaml`;
        const configPath = resolve(process.cwd(), configFile);

        if (!fs.existsSync(configPath)) {
            this.logger.warn(`Missing ${configFile} file.`);
        }

        nconf
            .argv()
            .env({ separator: '__', logicalSeparator: '.', lowerCase: true })
            .file({ file: configPath, format: yaml, logicalSeparator: '.' });
    }

    /**
     * Return common value
     * @param {string} key
     * @param {T} defaultValue
     */
    get<T = any>(key: string, defaultValue: T = undefined): T {
        const result = nconf.get(key) || defaultValue;

        if (result === undefined) {
            throw new RuntimeException(`Key ${key} not found.`);
        }
        return result;
    }

    /**
     * Get package meta from package.json
     * @param key
     * @param defaultValue
     */
    package<T = any>(key: string, defaultValue: T = null): T {
        return packageMeta[key] || defaultValue;
    }
}