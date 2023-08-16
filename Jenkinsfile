@Library('global-shared-library') _
def componentArray = [];
def componentArrayMerged = [];
def message = "";
pipeline {
    agent any
    environment {
        TAG = sh(script: "echo `date +%Y-%m%d-%H%M`", returnStdout: true).trim()
        Registry = "pgtgs/"
        GitUrl = "gitlab.com/inwoker/tgs/tgs-web-t2.git"
        ImageTagUrl = "https://gitlab.com/api/v4/projects/20478010/registry/repositories/2172986/tags"
        dockerhub = credentials('dockerhub')
        Image = "lobby-t2"
    }
    stages {		    	
        stage('Prepare Env') {
            steps {
                sh "docker login -u ${dockerhub_USR} -p ${dockerhub_PSW}"
                sh "echo 'Branch: ${env.GIT_BRANCH}'";
                script {
                    switch(env.GIT_BRANCH)
                    {
                        case ['master', 'origin/master']:
                            env.kube_ns = "prod";
                            env.k8s_config = 'prod-k8s-config';	
                            sh "git config --file=.gitmodules submodule.src/components/Wap.branch master";
                            sh "git config --file=.gitmodules submodule.src/api-services.branch master";
                            sh "git submodule sync";
                            sh "git submodule update --remote";
                            break;
                        case ['release/current', 'origin/release/current']:
                            env.kube_ns = "staging";
                            env.k8s_config = 'stag-k8s-config';
                            sh "git config --file=.gitmodules submodule.src/components/Wap.branch release/current";
                            sh "git config --file=.gitmodules submodule.src/api-services.branch develop";
                            sh "git submodule sync";
                            sh "git submodule update --remote";
                            break;
                        default:
                            env.kube_ns = "dev";
                            env.k8s_config = 'k8s-kube-config' 
                            sh "git config --file=.gitmodules submodule.src/components/Wap.branch develop";
                            sh "git config --file=.gitmodules submodule.src/api-services.branch develop";
                            sh "git submodule sync";
                            sh "git submodule update --remote";
                            break;
                    }
                    TAG = env.kube_ns + '-' + TAG
					MergedTag = 'merged-' + TAG
                    message += "\nBranch: ${env.GIT_BRANCH}" 
                    message += "\nImage: ${Image}"
                    message += "\nTag: ${TAG}"
                    message += "\nEnv: $env.kube_ns"
                    env.commit_url = "${env.GIT_URL}".replace(".git","/-/commit/") + "${env.GIT_COMMIT}"
                    message += "\n Commit: ${env.commit_url}"
                }

                configFileProvider([configFile(fileId: 'tgs.' + env.kube_ns, variable: 'tgsconfig')]) {
                    script {
                        def envItems = readProperties file: "$tgsconfig";
                        envItems.each { key, value -> 
                            env."tgs_${key}" = value;
                        }
                        componentArray = "${env.tgs_lobby_t2_components}".split(",")
						componentArrayMerged = "${env.tgs_lobby_t2_components_merged}".split(",")
                    }
                }

                sh "echo 'env: $env.kube_ns'"
                sh "echo 'tag: ${TAG}'"
            }
        }	
        stage('Docker Build') {  
            steps {	  			    
                sh "docker build -t ${Registry}${Image}:${TAG} ."
                sh "docker tag ${Registry}${Image}:${TAG} ${Registry}${Image}:$env.kube_ns"
            }
        }			
        stage('Docker Push') {   
            steps {	  
                sh "docker push ${Registry}${Image}:${TAG}"
                sh "docker push ${Registry}${Image}:$env.kube_ns"
            }
        }
		stage('Deploy') {
            when {
                expression {
                    return env.kube_ns == 'prod';
                }
            }

            steps {
                script {
                    input message: 'Ready to go?', ok: 'yes';
                }
                
                sh "echo start deploy"
            }
        }
        stage('Deployment') {   
            steps {	  
                script {			
                    withKubeConfig([credentialsId: env.k8s_config]) {
                        message += "\nComponent:"
						if (env.tgs_lobby_t2_components!="") {
							for (i = 0;i < componentArray.length; i++) {
								message += "\n    ${componentArray[i]}"
								sh "kubectl set image deployment/${componentArray[i]} ${componentArray[i]}=${Registry}${Image}:${TAG} --record -n $env.kube_ns"
							}
						}
                    }
                }
            }
        }	
        // stage('Add Tag on Prod') {
        //     when {
        //         expression {
        //             return env.kube_ns == 'prod';
        //         }
        //     }					
        //     steps {	
        //         withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId:'gitssh-user-pwd', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
        //             sh "git tag -a ${TAG} -m ${TAG}"
        //             sh "git push https://$USERNAME:$PASSWORD@${GitUrl} --tags"
        //         }
        //     }
        // }	
        //stage('Remove Image Tags') {					
        //    steps {	
        //        withCredentials([string(credentialsId: "GitLabToken", variable: "GitLabToken")]) {					
        //            sh "curl --request DELETE --data \'name_regex_delete=.*\' --data \'keep_n=10\' --header \'PRIVATE-TOKEN: ${GitLabToken}\' ${ImageTagUrl}"
        //        }
        //    }
        //}
    }
    post {
        success {
             sendTelegram("Pipeline: ${currentBuild.fullDisplayName} OK! ${message} \n${currentBuild.getBuildCauses()[0].shortDescription}\n")
        }
        failure {
            sendTelegram("<b>Failed Pipeline:</b> ${currentBuild.fullDisplayName} Something is wrong with ${env.BUILD_URL}/console\n${currentBuild.getBuildCauses()[0].shortDescription}\n")
        }
    }
}
