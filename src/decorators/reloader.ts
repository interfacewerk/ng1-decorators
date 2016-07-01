import {Backend} from '../../config';

export class AutoUpdater {
  private updateInterval;
  constructor(private $interval, private callback) {}

  public start(d: number = Backend.reloadInterval) {
    this.stop();
    this.updateInterval = this.$interval(() => {
      this.callback();
    }, d);
  }

  public stop() {
    if (this.updateInterval && this.$interval.cancel(this.updateInterval)) {
      this.updateInterval = null;
    }
  }
}

export function Reloader(callback: () => any) {
  return function(target: Object & {$interval: ng.IIntervalService}, updater: string) {
      Object.defineProperty(target, updater, {
          get: function() {
              let that = this;
              this["_" + updater] = (this["_" + updater]) ? this["_" + updater] : new AutoUpdater(this.$interval, function () {
                callback.apply(that, arguments)
              });
              return this["_" + updater];
          },
          set: function(value) {
              this["_" + updater] = value;
          },
          enumerable: false,
          configurable: true
      });
    }
}
