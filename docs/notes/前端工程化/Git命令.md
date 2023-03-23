## Git  

* 创建本地仓库：`git init`  
* 将文件添加到暂存区`git add test.md`  
* 将文件提交到版本库`git commit -m <message> `
* 查看仓库状态（文件是否被修改）：`git status` 
* 文件修改的内容： `git diff`  
* 查看历史提交日志：`git log`  或  `git log --pretty=oneline`  
* 版本回退：
  * 回退到上一个版本：`git reset --hard HEAD^`    
  * 回退到指定版本：`git reset --hard <commit id>`  
  * 查看记录命令的版本id：`git reflog`  
* 丢弃工作区修改：`git check -- test.md`  
* 丢弃暂存区修改：`git reset HEAD test.md`  
* 删除版本库文件：
  * `git rm test.md`  
  * `git commit -m <message>`  
* 从版本库恢复至工作区：`git checkout -- test.md`  
* 关联一个远程库：`git remote add origin git@github.com:zz-12138/<depository>`
* 推送到远程仓库：`git push -u origin master`  或  `git push origin <name>`
* 从远程仓库克隆：`git clone git@github.com:zz-12138/<depository>`
* 创建并切换分支：`git checkout -b <name> `  或  `git switch -c <name>`
* 查看当前分支：`git branch`  
* 切换分支：`git checkout <name> ` 或 `git switch <name>`  
* 合并分支：`git merge dev`  
* 删除分支：`git branch -d dev`  

