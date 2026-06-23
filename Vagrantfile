Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/jammy64"
    config.vm.box_version = "20241002.0.0"

  config.vm.network "forwarded_port", guest: 3000, host: 3000, auto_correct: true
  config.vm.network "forwarded_port", guest: 5555, host: 5555, auto_correct: true
  config.vm.synced_folder ".", "/home/vagrant/mi_proyecto"

#config.vm.provision "ansible_local" do |ansible|
 #   ansible.playbook = "setup.yml"
  #  ansible.verbose = "v"
 # end

end