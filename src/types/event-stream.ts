import { RecordsFilter } from './records-types.js';

export type CallbackQueryRequest = {
  contextId: string;

}

// Define a GenericStream interface
interface Stream {
  close(): Promise<void>;
  open(): Promise<void>;
}

export type EventFilter = RecordsFilter & {
  method?: string;
  // Default to all methods. Otherwise, explicitly subscribe to subset of methods.
  interfaces?: string;
};

// EventStream is a sinked stream for Events
export interface EventStreamI extends Stream {
  installCallback(filters: EventFilter, callback: (e: BaseEvent) => Promise<void>): Promise<void>;
  removeCallback(callbackId: string): Promise<void>; // callback id;
  queryCallbacks(query: CallbackQueryRequest): Promise<void>;

  add(e: BaseEvent) : Promise<void>
  append(tenant: string, messageCid: string): Promise<string>
}

interface BaseEvent {
  id: string;
  type?: string;
  contextId: string;
  eventTimestamp?: string;
} 

type EventStreamCallbackFunction = {
  id: string;
  callback: (e: BaseEvent) => Promise<void>;
  filter: EventFilter;
}

/*
* Event stream provides a single pipeline for 
* Event data to pass through. 
* It allows for developers to attach multiple callback functions
* To an event stream, and also allows event buffering 
* if needed. 
*/ 
export class EventStream implements EventStreamI {

    private callbacks: Map<string, EventStreamCallbackFunction>
    isOpen: boolean = false;

    // TODO: Possibly add a buffered eventQueue for better handling. 
    // Event stream should pull off the queue. 
    constructor(){
        this.callbacks = new Map<string, EventStreamCallbackFunction>();
    }
  
    async installCallback(filter: EventFilter, callback: (e: BaseEvent) => Promise<void>): Promise<void> {
      // TODO create callback id
      const id = "FIXME"
      this.callbacks.set(id, {
        id: id,
        filter: filter,
        callback: callback,
      } )
    }
  
    async removeCallback(callbackId: string): Promise<void> {
      this.callbacks.delete(callbackId);
    }
  
    /*
    * needs some work. 
    * query filter should get functions that are appropriate
    * for context. 
    */
    queryCallbacks(query: CallbackQueryRequest): Promise<EventStreamCallbackFunction[]> {
      throw new Error('Method not implemented.');
    }
  
    async close(): Promise<void> {
        this.isOpen = false;
    }
  
    async open(): Promise<void> {
        this.isOpen = true;
    }
  
    async add(e: BaseEvent) : Promise<void> {
      const callbacks = await this.queryCallbacks({
        contextId: e.contextId,
      })
      callbacks.forEach((f) => {
        f.callback(e);
      })
    }
    
    async append(tenant: string, messageCid: string): Promise<string> {
        return "Asdf"
    }

  
  }