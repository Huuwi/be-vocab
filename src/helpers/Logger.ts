import fs from 'node:fs';
import util from 'node:util';

interface Loggable {
    log_info(...args: any[]): void;

    log_error(...args: any[]): void;
}

interface Parameter {
    info_file: string;
    error_file: string;
}

class Logger implements Loggable {

    private m_info: fs.WriteStream;

    private m_console_info: typeof console;

    private m_error: fs.WriteStream;

    private m_console_error: typeof console;

    public constructor(
        { info_file, error_file }: Parameter
    ) {
        this.m_info = fs.createWriteStream(info_file, { flags: 'a' });
        this.m_error = fs.createWriteStream(error_file, { flags: 'a' });
        this.m_console_info = console;
        this.m_console_error = console;
        console.log = this.log_info.bind(this);
        console.error = this.log_error.bind(this)
    }

    public log_info(...args: any[]): void {
        const message = util.format(...args);
        this.m_info.write(message + '\n');
        this.m_console_info.log(...args);
    }

    public log_error(...args: any[]): void {
        const message = util.format(...args);
        this.m_error.write(message + '\n');
        this.m_console_error.error(...args);
    }

}

export {
    Logger,
    Loggable,
}