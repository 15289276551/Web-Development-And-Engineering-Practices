// @flow
import { SpiderStatistics } from "./entity/SpiderStatistics";
import Crawler from "../Crawler";
import Spider from "../Spider";
import CrawlerStatistics from "./entity/CrawlerStatistics";

export default class Store {
  // 存放爬虫统计信息列表
  crawlerStatisticsMap: { [string]: CrawlerStatistics } = {};

  /**
   * @function 增加某个爬虫的调用频次
   * @param spider
   * @param time
   * @param crawler
   */
  incrementSpiderCount = (spider: Spider, time: Date, crawler: Crawler) => {
    // 取出爬虫统计信息
    let crawlerStatistics: CrawlerStatistics = this.crawlerStatisticsMap[
      crawler.name
    ];

    let key = spider.name;

    // 判断是否存在
    if (!crawlerStatistics.spiderStatisticsList[key]) {
      crawlerStatistics.spiderStatisticsList[key] = new SpiderStatistics(
        spider,
        time
      );
    }

    // 将爬虫次数加一
    crawlerStatistics.spiderStatisticsList[key].incrementCount(time);
  };

  /**
   * @function 更新某个蜘蛛的执行时间
   * @param spider
   * @param duration
   * @param crawler
   */
  updateSpiderExecuteTime = (
    spider: Spider,
    duration: time,
    crawler: Crawler
  ) => {
    // 获取当前的蜘蛛对象
    let crawlerStatistics: CrawlerStatistics = this.crawlerStatisticsMap[
      crawler.name
    ];

    // 更新蜘蛛执行时间
    crawlerStatistics.spiderStatisticsList[spider.name].updateExecuteDuration(
      duration
    );
  };

  /**
   * @function 获取所有爬虫信息
   */
  get crawlers() {
    let crawlerStatusList = [];

    for (let crawlerName in this.crawlerStatisticsMap) {
      let crawlerStatistics: CrawlerStatistics = this.crawlerStatisticsMap[
        crawlerName
      ];

      let crawler: Crawler = crawlerStatistics.instance;

      crawlerStatusList.push({
        name: crawler.name,
        displayName: crawler.displayName,
        isRunning: crawlerStatistics.isRunning,
        lastStartTime: crawlerStatistics.lastStartTime,
        lastFinishTime: crawlerStatistics.lastFinishTime,
        lastError: crawlerStatistics.lastError ? JSON.parse(crawlerStatistics.lastError.message) : undefined
      });
    }

    return crawlerStatusList;
  }
}
